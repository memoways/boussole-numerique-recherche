/**
 * Fil d’Ariane — repère éditorial discret bleu Memoways, en continuité avec la navigation globale.
 */
import { Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBreadcrumbs } from "@/lib/seo";

export default function PageBreadcrumbs({ pathname }: { pathname: string }) {
  const items = getBreadcrumbs(pathname);

  if (items.length < 2) return null;

  const current = items.at(-1)!;
  const intermediateItems = items.slice(1, -1);
  const accessiblePath = items.map((item) => item.label).join(" › ");

  return (
    <div className="relative z-10 mt-14 border-b border-slate-100 bg-white/85 backdrop-blur-sm sm:mt-16">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6">
        <Breadcrumb aria-label={`Fil d’Ariane : ${accessiblePath}`}>
          <BreadcrumbList className="text-xs sm:text-sm">
            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild className="font-medium text-slate-500 hover:text-[#515792]">
                <Link href={items[0].path}>{items[0].label}</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator className="text-slate-300" />
            </BreadcrumbItem>
            {intermediateItems.length > 0 && (
              <BreadcrumbItem className="sm:hidden">
                <BreadcrumbEllipsis className="size-5 text-slate-400" />
                <BreadcrumbSeparator className="text-slate-300" />
              </BreadcrumbItem>
            )}
            {intermediateItems.map((item) => (
              <BreadcrumbItem key={item.path} className="hidden sm:inline-flex">
                <BreadcrumbLink asChild className="font-medium text-slate-500 hover:text-[#515792]">
                  <Link href={item.path}>{item.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator className="text-slate-300" />
              </BreadcrumbItem>
            ))}
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="max-w-[10rem] truncate font-semibold text-[#515792] min-[380px]:max-w-[15rem] sm:max-w-none">
                {current.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
