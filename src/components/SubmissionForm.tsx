import { useState } from 'preact/hooks';
import type { Segment } from '../data/segments';

interface SubmissionFormProps {
  accessKey: string;
  segment: Segment;
}

export default function SubmissionForm({
  accessKey,
  segment
}: SubmissionFormProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setFormSubmitted(true);
        setResponseMessage(segment.successMessage);
      } else {
        setResponseMessage(
          data.message || 'Something went wrong. Please try again.'
        );
      }
    } catch (error) {
      setResponseMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (formSubmitted) {
    return (
      <div
        class="rounded-lg bg-green-100 p-4 text-green-800 dark:bg-green-900 dark:text-green-200"
        role="status"
      >
        {responseMessage}
      </div>
    );
  }

  return (
    <form class="flex flex-col gap-6" onSubmit={submit}>
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value={segment.subject} />
      <input type="hidden" name="from_name" value="Overcommitted submissions" />

      <input
        type="checkbox"
        name="botcheck"
        class="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      {segment.fields.map((field) => {
        const helpId = field.help ? `${field.name}-help` : undefined;

        return (
          <div class="flex flex-col gap-2" key={field.name}>
            <label class="font-medium" for={field.name}>
              {field.label}
              {!field.required && (
                <span class="ml-2 text-sm font-normal opacity-70">
                  (optional)
                </span>
              )}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                class="input min-h-48"
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                aria-describedby={helpId}
              />
            ) : (
              <input
                class="input"
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                aria-describedby={helpId}
              />
            )}

            {field.help && (
              <p class="text-sm opacity-70" id={helpId}>
                {field.help}
              </p>
            )}
          </div>
        );
      })}

      {responseMessage && (
        <div
          class="rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900 dark:text-red-200"
          role="alert"
        >
          {responseMessage}
        </div>
      )}

      <div class="flex w-full justify-end">
        <button class="btn w-full justify-center lg:w-auto" disabled={isSubmitting}>
          <span class="rounded-full px-12 py-3 text-center text-sm text-light-text-heading dark:text-white">
            {isSubmitting ? 'Submitting...' : segment.submitLabel}
          </span>
        </button>
      </div>
    </form>
  );
}
