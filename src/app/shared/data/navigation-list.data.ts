import { NavItem } from "../models/nav-item.model";

export class NavigationList {
  static get items(): NavItem[] {
    return [
      {
        displayName: "Application Setup",
        iconName: "settings_suggest",
        route: "",
        children: [
          {
            displayName: "Application",
            iconName: "date_range",
            route: "application",
          },
        ],
      },
    ];
  }
}
