import { useEffect, useState } from 'react'
import { defineOneEntry } from 'oneentry'
import { Link } from 'react-router-dom';

function HomePage() {
  const [pages, setPages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const api = defineOneEntry(import.meta.env.VITE_ONEENTRY_URL, { token: import.meta.env.VITE_TOKEN as string, langCode: 'en_US' });
    // console.log(api);

    async function fetchPages() {
      setLoading(true);
      try {
        const pagesRes = await api.Pages.getPages();
        console.log(pagesRes);
        setPages(pagesRes)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPages();
  }, []);

  return (
    <>
      <div className='bg-[#24272f] text-[#eee] flex flex-col items-center min-h-screen'>
        <h1 className='text-3xl mb-3 mt-10'>My OneEntry</h1>
        {loading ? <code>
          <pre>connecting...</pre>
        </code> : pages.length ? pages.map((page: any) => <Link to={page.pageUrl}>{page.localizeInfos.menuTitle}</Link>) : <div>No page yet</div>}
      </div>
    </>
  )
}

export default HomePage
