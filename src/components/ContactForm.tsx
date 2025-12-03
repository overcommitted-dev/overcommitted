import { useState } from 'preact/hooks';

interface ContactFormProps {
  accessKey: string;
}

export default function ContactForm({ accessKey }: ContactFormProps) {
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
        setResponseMessage(data.message || 'Thanks for contacting us! We\'ll be in touch soon.');
      } else {
        setResponseMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setResponseMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {formSubmitted ? (
        <div class="rounded-lg bg-green-100 p-4 text-green-800 dark:bg-green-900 dark:text-green-200">
          {responseMessage}
        </div>
      ) : (
        <form class="flex flex-col gap-2" onSubmit={submit}>
          <input
            type="hidden"
            name="access_key"
            value={accessKey}
          />
          
          <input
            class="input"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />
          <input
            class="input"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <textarea
            class="input"
            id="message"
            name="message"
            placeholder="Write a message"
            required
          />

          {responseMessage && !formSubmitted && (
            <div class="rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900 dark:text-red-200">
              {responseMessage}
            </div>
          )}

          <div class="my-6 flex w-full justify-end">
            <button 
              class="btn w-full justify-center lg:w-auto" 
              disabled={isSubmitting}
            >
              <span class="rounded-full px-12 py-3 text-center text-sm text-light-text-heading dark:text-white">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </span>
            </button>
          </div>
        </form>
      )}
    </>
  );
}
