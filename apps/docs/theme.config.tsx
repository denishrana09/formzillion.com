import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import AppLogo from "./components/AppLogo";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  logo: <AppLogo />,
  project: {
    link: "https://github.com/formzillion/formzillion.com",
  },
  chat: {
    link: "https://discord.com",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Formzillion",
    };
  },
  primaryHue: 31,
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 2,
    toggleButton: true,
  },
  head: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { asPath, defaultLocale, locale } = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { frontMatter } = useConfig();
    const url =
      "https://docs.formzillion.com" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <link
          rel="icon"
          type="image/x-icon"
          sizes="any"
          href={"/favicon.ico"}
        />
        <meta property="og:url" content={url} />
        <meta
          property="og:title"
          content={frontMatter.title || "Formzillion"}
        />
        <meta
          property="og:description"
          content={
            frontMatter.description || "Instant backend for all your forms"
          }
        />
      </>
    );
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} The Formzillion Project.
        </p>
      </div>
    ),
  },
};

export default config;
