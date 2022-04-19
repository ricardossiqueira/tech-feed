import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkPropsInterface extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkPropsInterface) {
  const { asPath } = useRouter();

  const className = rest.href === asPath ? activeClassName : "";

  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
}
