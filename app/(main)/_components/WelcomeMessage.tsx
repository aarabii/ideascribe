import React from "react";

interface WelcomeMessageProps {
  name: string;
  message: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  name,
  message,
}) => (
  <span>
    {message.split("{name}").reduce<React.ReactNode[]>((acc, part, i) => {
      if (i === 0) {
        return [part];
      }
      return acc.concat(<strong key={i}>{name}</strong>, part);
    }, [])}
  </span>
);
