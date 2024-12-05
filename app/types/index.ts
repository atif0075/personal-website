export interface Letter {
  char: string;
  visible: boolean;
  isFirst: boolean;
}

export interface SocialLink {
  url: string;
  label: string;
  platform: "github" | "linkedin" | "facebook";
}
