export interface SubmissionField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  placeholder: string;
  required?: boolean;
  help?: string;
}

export interface Segment {
  slug: string;
  pageTitle: string;
  heading: string;
  pitch: string;
  promise: {
    heading: string;
    points: string[];
  };
  example: {
    label: string;
    prompt: string;
  };
  fields: SubmissionField[];
  subject: string;
  submitLabel: string;
  successMessage: string;
}

export const segments: Record<string, Segment> = {
  'honest-answers': {
    slug: 'honest-answers',
    pageTitle: 'Honest Answers',
    heading: 'Honest Answers',
    pitch:
      "Send us a workplace, career, or technical fork-in-the-road situation and we'll say what we'd really do, including the awkward and political parts most career advice skips. We commit to answers, and sometimes we disagree on purpose.",
    promise: {
      heading: 'Everything is anonymized',
      points: [
        'We never say your name, your company, or your team on the show. We paraphrase identifying details before we discuss anything.',
        'Your name and email are optional. Leave them blank and we still read every word.',
        "If you do leave an email, it's only so we can reply privately. We never read it on air."
      ]
    },
    example: {
      label: 'For example',
      prompt:
        'A senior engineer is pushing a design I think is wrong. How do I push back?'
    },
    fields: [
      {
        name: 'situation',
        label: "What's going on?",
        type: 'textarea',
        placeholder:
          "Describe your situation, including the details you'd never say out loud at work.",
        required: true
      },
      {
        name: 'alias',
        label: 'What should we call you on air?',
        type: 'text',
        placeholder: 'A first name, a nickname, or nothing at all',
        help: "Optional. Leave it blank and we'll just call you a listener."
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'you@example.com',
        help: 'Optional, only if you want a private reply. Never read on the show.'
      }
    ],
    subject: 'Honest Answers submission',
    submitLabel: 'Send it anonymously',
    successMessage:
      "Got it. We'll anonymize the details before we talk about it. Thanks for trusting us with the real thing."
  },
  'root-cause': {
    slug: 'root-cause',
    pageTitle: 'Root Cause',
    heading: 'Root Cause',
    pitch:
      "Tell us something you've accepted as just how software works, and we'll dig into why it's actually like that: the history, the tradeoff, the decision nobody remembers making. When the cause is genuinely disputed, we each take a theory, test it, and report what we found.",
    promise: {
      heading: 'What makes a good one',
      points: [
        'The best submissions are things everyone has stopped questioning, not one-off bugs.',
        "Half-formed is fine. If you can't explain why it bugs you, that's usually a sign it's worth digging into.",
        'We close each one with what it teaches you about designing your own systems.'
      ]
    },
    example: {
      label: 'For example',
      prompt:
        'Why does every codebase grow a utils file that turns into a junk drawer?'
    },
    fields: [
      {
        name: 'situation',
        label: 'What have you accepted as just how software works?',
        type: 'textarea',
        placeholder:
          "Describe the thing, and why you suspect there's a story behind it.",
        required: true
      },
      {
        name: 'alias',
        label: 'Want a shoutout?',
        type: 'text',
        placeholder: 'The name we should credit on air',
        help: "Optional. Leave it blank and we'll keep it anonymous."
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'you@example.com',
        help: 'Optional, only if you want us to follow up. Never read on the show.'
      }
    ],
    subject: 'Root Cause submission',
    submitLabel: 'Send it in',
    successMessage:
      "Got it. We'll go find out why. Thanks for the question, these are the ones we have the most fun with."
  }
};
