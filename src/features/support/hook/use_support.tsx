const useSupport = () => {
  const accountSupport = [
    {
      title: "Set up your gokapinnotech account",
      subtitle: "Get started with gokapinnotech",
      explanation:
        "Follow these steps to create a new account on the gokapinnotech platform.",
      steps: [
        "Go to the gokapinnotech website and click on the 'Sign Up' button.",
        "Enter your email address and create a secure password.",
        "Verify your email address by clicking the link in the confirmation email.",
        "Complete your profile by providing your name and other optional information.",
        "Start exploring the gokapinnotech platform and enroll in courses that interest you.",
      ],
    },
    {
      title: "Change your gokapinnotech account settings",
      subtitle: "Manage your account preferences",
      explanation:
        "You can update your account preferences, notifications, and other settings here.",
      steps: [
        "Log in to your gokapinnotech account and go to the 'Settings' section.",
        "Update your email address, password, or profile information as needed.",
        "Customize your notification preferences to receive updates on new courses, deadlines, and more.",
        "Manage your payment methods and subscription plans.",
        "Review and update your privacy and data sharing settings.",
      ],
    },

    {
      title: "Update your profile name or verified name",
      subtitle: "Manage your display name",
      explanation:
        "Edit your display name or verify your identity to update your name on the platform.",
      steps: [
        "Log in to your gokapinnotech account and go to the 'Profile' section.",
        "Click on the 'Edit Profile' button.",
        "Enter your new display name or update your verified name by providing identification documents.",
        "Save your changes, and your updated name will be visible throughout the platform.",
        "Note that changing your verified name may require additional verification steps.",
      ],
    },
    {
      title: "Delete your gokapinnotech account",
      subtitle: "Permanently remove your account",
      explanation:
        "If you wish to permanently remove your account, follow these instructions.",
      steps: [
        "Log in to your gokapinnotech account and go to the 'Settings' section.",
        "Scroll down to the bottom and locate the 'Delete Account' option.",
        "Read the information carefully and understand the consequences of deleting your account.",
        "Enter your password to confirm your identity.",
        "Click 'Delete Account' to permanently remove your account and associated data from gokapinnotech.",
      ],
    },
  ];

  const paymentSupport = [
    {
      title: "Payments on gokapinnotech",
      subtitle: "Manage your payments",
      explanation:
        "Learn about making payments for courses and Specializations on the gokapinnotech platform.",
      steps: [
        "Browse the project catalog and select the project you have completed.",
        "Click on the 'Request Payment' button and follow the prompts to initiate the payment process.",
        "Provide the necessary details about the completed project.",
        "Choose your preferred payment method and provide the necessary payment information.",
        "Review and confirm your payment details.",
        "Once the payment is processed successfully, you'll receive the payment for the completed project.",
      ],
    },
    {
      title: "Accepted payment methods",
      subtitle: "methods for compeleting payment",
      steps: [
        "gokapinnotech accepts various payment methods, including credit/debit cards (Visa, Mastercard) and other region-specific options.",
        "During the payment process, you'll be presented with the available payment methods for your location.",
        "Select your preferred payment method and follow the on-screen instructions to complete the payment.",
      ],
    },
  ];

  return {
    accountSupport,
    paymentSupport,
  };
};

export default useSupport;
