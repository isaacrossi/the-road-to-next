// this replaces the chevron from shad cn
import { LucideSlash } from "lucide-react";
// import link from next to link back to prev pages
import Link from "next/link";
import { Fragment } from "react";
// bread crumb components from shad cn
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

// this breadcrumbs is an array of objects with a title and an optional href
// href optional because current page wont have a link but prev ones will
type BreadcrumbsProps = {
  breadcrumbs: {
    title: string;
    href?: string;
  }[];
};

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <Breadcrumb>
      {/* using ol and li from shad cn */}
      <BreadcrumbList>
        {/* mapping over breadcrumbs array to create breadcrumb items */}
        {breadcrumbs.map((breadcrumb, index) => {
          // default to breadcrumb page if no href (current page)
          let breadcrumbItem = (
            <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
          );
          // if href provided then create breadcrumb link
          // we use the asChild prop because we are using our own Link component
          if (breadcrumb.href) {
            breadcrumbItem = (
              <BreadcrumbLink asChild>
                <Link
                  href={breadcrumb.href}
                  className="flex items-center gap-1"
                >
                  {breadcrumb.title}
                </Link>
              </BreadcrumbLink>
            );
          }

          // then we render this breadcrumb item and if it's not the last item we render a slash
          // we import the Fragment component from react as we have to provide a key, we cant use
          // and empty fragment in this case "<></>"
          return (
            <Fragment key={breadcrumb.title}>
              <BreadcrumbItem>{breadcrumbItem}</BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <LucideSlash className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { Breadcrumbs };
