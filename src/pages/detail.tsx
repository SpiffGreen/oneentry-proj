import { useEffect, useState } from 'react'
import { defineOneEntry } from 'oneentry'
import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown'

function DetailPage() {
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const api = defineOneEntry(import.meta.env.VITE_ONEENTRY_URL, { token: import.meta.env.VITE_TOKEN as string, langCode: 'en_US' });

    async function fetchPages() {
      setLoading(true);
      try {
        const pageRes = await api.Pages.getPageByUrl(id as string);
        console.log(pageRes);
        setPage(pageRes)
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
        </code> : page ? <Markdown className={"my-content"}>{page.localizeInfos.plainContent}</Markdown> : <div>No page data</div>}
      </div>
    </>
  )
}

export default DetailPage
