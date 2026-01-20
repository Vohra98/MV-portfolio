"use client";

import {ChatKit, useChatKit} from "@openai/chatkit-react";
import {createSession} from "@/actions/create-session";
import {useSidebar} from "@/components/ui/sidebar";
import type {CHAT_PROFILE_QUERYResult} from "@/sanity.types";

const Chat = ({ profile }: { profile: CHAT_PROFILE_QUERYResult | null }) => {
  const { toggleSidebar } = useSidebar();
  const { control } = useChatKit({
    api: {
      async getClientSecret() {
        return await createSession();
      },
    },
    theme: {},
    header: {
      title: {
        text: `Chat with ${profile?.firstName || "me"} `,
      },
      leftAction: {
        icon: "close",
        onClick: () => {
          // toggle sideBar
          toggleSidebar();
        },
      },
    },
    startScreen: {
      greeting: `Hey I'm ${profile?.firstName || "Muhammad"}'s AI persona`,
      prompts: [
        {
          icon: "suitcase",
          label: "What's your experience?",
          prompt:
            "Tell me about your professional experience and previous roles",
        },
        {
          icon: "square-code",
          label: "What skills do you have?",
          prompt:
            "What technologies and programming languages do you specialize in?",
        },
        {
          icon: "cube",
          label: "What have you built?",
          prompt: "Show me some of your most interesting projects",
        },
        {
          icon: "profile",
          label: "Who are you?",
          prompt:
            "Tell me more about yourself and your professional background",
        },
      ],
    },
    composer: {
      attachments: {
        enabled: true,
      },
    },
    disclaimer: {
      text: "AI-generated responses based on Muhammad's persona. Muhammad isn’t live but you can reach him via email or phone",
    },
  });
  return <ChatKit control={control} className="h-full w-full z-50" />;
};

export default Chat;
