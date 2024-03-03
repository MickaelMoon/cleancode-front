type HomeButtonProps = {
    className?: string;
    children: string;
    href?: string;
}

export function NavigateToButton({className, href, children}: HomeButtonProps){
    return (
        <a className={className} href={href}>{children}</a>
    );
}