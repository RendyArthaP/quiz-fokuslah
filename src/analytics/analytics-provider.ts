/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnalyticsProvider, AnalyticsEvent } from "@/types/analytics.type";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Google Analytics 4 Provider (Functional)
export const createGA4Provider = (gaId: string): AnalyticsProvider => {
  let isInitialized = false;

  const initialize = () => {
    if (typeof window === "undefined" || isInitialized) return;

    // Load GA4 script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    gtag("js", new Date());
    gtag("config", gaId);

    // Make gtag available globally
    (window as any).gtag = gtag;
    isInitialized = true;

    console.log("📊 GA4 Provider initialized");
  };

  const track = (event: AnalyticsEvent) => {
    if (typeof window === "undefined" || !(window as any).gtag) return;
    (window as any).gtag("event", event.event_name, {
      ...event.properties,
      custom_parameter_session_id: event.session_id,
    });
  };

  const identify = (userId: string, properties?: Record<string, any>) => {
    if (typeof window === "undefined" || !(window as any).gtag) return;
    (window as any).gtag("config", gaId, {
      user_id: userId,
      custom_map: properties,
    });
  };

  const page = (pageName: string, properties?: Record<string, any>) => {
    if (typeof window === "undefined" || !(window as any).gtag) return;
    (window as any).gtag("event", "page_view", {
      page_title: pageName,
      ...properties,
    });
  };

  return {
    initialize,
    track,
    identify,
    page,
  };
};

// Mixpanel Provider (Functional)
export const createMixpanelProvider = (token: string): AnalyticsProvider => {
  let isInitialized = false;

  const initialize = () => {
    if (typeof window === "undefined" || isInitialized) return;

    // Load Mixpanel script
    const script = document.createElement("script");
    script.src = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
    script.onload = () => {
      (window as any).mixpanel.init(token);
      isInitialized = true;
      console.log("📊 Mixpanel Provider initialized");
    };
    document.head.appendChild(script);
  };

  const track = (event: AnalyticsEvent) => {
    if (
      typeof window === "undefined" ||
      !(window as any).mixpanel ||
      !isInitialized
    )
      return;
    (window as any).mixpanel.track(event.event_name, event.properties);
  };

  const identify = (userId: string, properties?: Record<string, any>) => {
    if (
      typeof window === "undefined" ||
      !(window as any).mixpanel ||
      !isInitialized
    )
      return;
    (window as any).mixpanel.identify(userId);
    if (properties) {
      (window as any).mixpanel.people.set(properties);
    }
  };

  const page = (pageName: string, properties?: Record<string, any>) => {
    if (
      typeof window === "undefined" ||
      !(window as any).mixpanel ||
      !isInitialized
    )
      return;
    (window as any).mixpanel.track("Page View", {
      page_name: pageName,
      ...properties,
    });
  };

  return {
    initialize,
    track,
    identify,
    page,
  };
};

// Custom API Provider (Functional)
export const createCustomAPIProvider = (
  apiEndpoint: string,
  apiKey?: string
): AnalyticsProvider => {
  let isInitialized = false;

  const initialize = () => {
    if (isInitialized) return;

    isInitialized = true;
    console.log("📊 Custom Analytics API Provider initialized");
  };

  const track = async (event: AnalyticsEvent) => {
    if (!isInitialized) return;

    try {
      const response = await fetch(`${apiEndpoint}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }
    } catch (error) {
      console.error("📊 Custom Analytics Error:", error);
    }
  };

  const identify = (userId: string, properties?: Record<string, any>) => {
    track({
      event_name: "user_identified",
      properties: { user_id: userId, ...properties },
      timestamp: new Date(),
      session_id: "identify",
    });
  };

  const page = (pageName: string, properties?: Record<string, any>) => {
    track({
      event_name: "page_view",
      properties: { page_name: pageName, ...properties },
      timestamp: new Date(),
      session_id: "page_view",
    });
  };

  return {
    initialize,
    track,
    identify,
    page,
  };
};

// Console Provider for Development (Functional)
export const createConsoleProvider = (): AnalyticsProvider => {
  const initialize = () => {
    console.log("📊 Console Provider initialized (Development Mode)");
  };

  const track = (event: AnalyticsEvent) => {
    console.log("📊 Analytics Event:", {
      event: event.event_name,
      properties: event.properties,
      timestamp: event.timestamp,
    });
  };

  const identify = (userId: string, properties?: Record<string, any>) => {
    console.log("📊 User Identified:", { userId, properties });
  };

  const page = (pageName: string, properties?: Record<string, any>) => {
    console.log("📊 Page View:", { pageName, properties });
  };

  return {
    initialize,
    track,
    identify,
    page,
  };
};

// Utility function to create multiple providers
export const createAnalyticsProviders = (config: {
  ga4Id?: string;
  mixpanelToken?: string;
  customApiUrl?: string;
  customApiKey?: string;
  enableConsole?: boolean;
}): AnalyticsProvider[] => {
  const providers: AnalyticsProvider[] = [];

  if (config.ga4Id) {
    providers.push(createGA4Provider(config.ga4Id));
  }

  if (config.mixpanelToken) {
    providers.push(createMixpanelProvider(config.mixpanelToken));
  }

  if (config.customApiUrl) {
    providers.push(
      createCustomAPIProvider(config.customApiUrl, config.customApiKey)
    );
  }

  if (config.enableConsole || process.env.NODE_ENV === "development") {
    providers.push(createConsoleProvider());
  }

  return providers;
};
