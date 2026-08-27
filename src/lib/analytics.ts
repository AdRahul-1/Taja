/**
 * Analytics and Conversion Funnel Event Dispatcher.
 * Dispatches structured events to window.dataLayer, Google Analytics (gtag), or Meta Pixel.
 */

type ConsumerEvent =
  | { name: "hero_cta_explore_shelf"; payload?: { flavor: string } }
  | { name: "flavor_toggle_switched"; payload: { flavor: "jhal" | "misti" } }
  | { name: "ingredient_inspected"; payload: { id: string; name: string } }
  | { name: "shelf_sku_opened"; payload: { skuId: string; title: string; price: string } }
  | { name: "shelf_filter_changed"; payload: { filter: string } }
  | { name: "consumer_feedback_submitted"; payload?: Record<string, unknown> };

type DistributorEvent =
  | { name: "distributor_cta_clicked"; payload: { source: "nav" | "hero" | "footer" | "direct" } }
  | { name: "distributor_form_started"; payload?: Record<string, unknown> }
  | { name: "distributor_gst_validated"; payload: { stateCode: string } }
  | { name: "distributor_inquiry_submitted"; payload: { state: string; volumeTier: string } };

export type TrackEvent = ConsumerEvent | DistributorEvent;

export function trackEvent(event: TrackEvent): void {
  if (typeof window === "undefined") return;

  // 1. window.dataLayer (Google Tag Manager)
  if (Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
      event: event.name,
      ...("payload" in event ? event.payload : {}),
      timestamp: new Date().toISOString(),
    });
  }

  // 2. Google Analytics gtag.js
  if (typeof (window as unknown as { gtag?: Function }).gtag === "function") {
    (window as unknown as { gtag: Function }).gtag(
      "event",
      event.name,
      "payload" in event ? event.payload : {}
    );
  }

  // 3. Development debug logging
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event] ${event.name}:`, "payload" in event ? event.payload : {});
  }
}
