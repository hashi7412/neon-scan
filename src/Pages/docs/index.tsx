import React from 'react';
import { Link, useParams } from "react-router-dom";
import useStore from '../../useStore';
import './docs.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PageObject {
	emoji?: 	string
	title: 		string
	uri: 		string
}

interface SubjectObject extends PageObject {
	pages?: PageObject[]
}

const Docs = () => {
	const params = useParams<{lang: string, category: string, page: string}>();
	const lang = 'en-US'
	const { showLoading } = useStore()
	const [list, setList] = React.useState<SubjectObject[]>([])
	const [data, setData] = React.useState('')

	const getList = async () => {
		showLoading(true)
		try {
			const res = await fetch(`/docs/${lang}/index.json`)
			const json = await res.json()
			setList(json)
		} catch (error) {}
		showLoading(false)
	}

	const getData = async (category: string, page?: string) => {
		//showLoading(true)
		try {
			const res = await fetch(`/docs/${lang}/${category}${!!page ? `/${page}` : ''}.md`)
			const text = await res.text()
			setData(text)
		} catch (error) {
			
		}
		//showLoading(false)
	}

	React.useEffect(()=>{
		if (list.length===0) getList()
	}, [lang])
	
	React.useEffect(()=>{
		if (!params.category) {
			getData('introduction')
		} else {
			getData(params.category, params.page)
		}
	}, [params.category, params.page])

	return (
		<section className='docs container'>
			<div className='flex'>
				<div className='list scroll'>
					<ul>
						{list.map((i, k)=>(
							<li key={k}>
								{!i.pages ? (
									<Link className={!params.category ? 'active' : ''} to={`/docs/${lang}/${i.uri}`}>{i.title}</Link>
								) : (
									<ul>
										<li style={{color: 'var(--color-secondary)'}}><span>{i.title}</span></li>
										{i.pages.map((p, m)=>(
											<li key={m}><Link className={`indent ${params.page===p.uri ? 'active' : ''}`} to={`/docs/${lang}/${i.uri}/${p.uri}`}>{p.title}</Link></li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
					
				</div>
				<div className='fill scroll'>
					<ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
				</div>
			</div>
		</section>
    )
}

export default Docs;