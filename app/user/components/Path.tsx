import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function BreadcrumbDemo() {
  const pathname = usePathname();

  const breadcrumbItems = [
    { href: "/user", label: "Dashboard" },
    { href: "/user/applications", label: "Applications" },
    { href: "/user/interviews", label: "Interviews" },
    { href: "/user/tasks", label: "Tasks" },
    { href: "/user/resources", label: "Resources" },
  ];

  const currentPageIndex = breadcrumbItems.findIndex(
    (item) => item.href === pathname
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.slice(0, currentPageIndex + 1).map((item, index) => (
          <BreadcrumbItem key={item.href}>
            {index < currentPageIndex ? (
              <>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
