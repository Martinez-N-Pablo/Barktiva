import { Meta } from "@angular/platform-browser";
import { MetaDescriptions } from "../const/magicStrings";

// This function sets the meta title tag based on the provided URL. SEO purposes.
export function setMetaDescriptionTag(meta: Meta, url: string) {
  let description = MetaDescriptions.home || '';

  switch (url) {
    case '/':
      description = MetaDescriptions.home || '';
      break;
    case '/login':
      description = MetaDescriptions.login || '';
      break;
    case '/singup':
      description = MetaDescriptions.singUp || '';
      break;
    case '/pet-form':
      description = MetaDescriptions.petForm || '';
      break;
    case '/dashboard':
      description = MetaDescriptions.dashboard || '';
      break;
    case '/task':
      description = MetaDescriptions.task || '';
      break;
    default:
      description = MetaDescriptions.home || '';
      break;
  }

  meta.updateTag({ name: 'description', content: description });
}