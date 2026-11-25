import { Redirect } from '@/components/redirect';

export default function Home() {
  return (
    <>
      <title>RunSpace // Developer Command Dashboard</title>
      <meta httpEquiv="refresh" content="0; url=/docs" />
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/docs');",
        }}
      />
      <Redirect to="/docs" />
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 min-h-[60vh]">
        <p className="text-sm text-fd-muted-foreground animate-pulse">
          Opening developer command dashboard...
        </p>
      </div>
    </>
  );
}

export async function getConfig() {
  return {
    render: 'static',
  } as const;
}
