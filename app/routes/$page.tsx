import type { LoaderFunctionArgs } from "@remix-run/node"
import type { MetaFunction } from "@remix-run/react"
import { redirect, useLoaderData, Link } from "@remix-run/react"
import { tv } from "tailwind-variants"

const displaySize = 30

import docs from "~/assets/docs.json"

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{
			title: `2024 - フォトコンテスト 全作品 ${(data?.page ?? 0) + 1}ページ目`,
		},
	]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const page = Number(params.page)
	if (page === undefined) return redirect("/0")
	const displayItems = docs.items.slice(
		page * displaySize,
		(page + 1) * displaySize,
	)
	return { page, displayItems }
}

const PageLink = ({ page }: { page: number }) => {
	return (
		<div className="w-full h-20 border-y flex flex-row justify-start items-center text-xl text-center z-1">
			{page === 0 ? (
				<Link className="w-1/2" to="/">
					優秀作品
				</Link>
			) : (
				<Link className="w-1/2" to={`/${Number(page) - 1}`}>
					前のページ
				</Link>
			)}
			{Number(page) + 1 < Math.ceil(docs.items.length / displaySize) ? (
				<Link className="w-1/2" to={`/${Number(page) + 1}`}>
					次のページ
				</Link>
			) : (
				<Link className="w-1/2" to="/">
					優秀作品
				</Link>
			)}
		</div>
	)
}

export default function Page() {
	const { page, displayItems } = useLoaderData<typeof loader>()
	const contentStyle = tv({
		base: "w-full flex flex-col justify-start items-center gap-4 border-b pb-8",
		variants: {
			alternate: {
				true: "bg-gray-100",
				false: "bg-white",
			},
		},
	})
	return (
		<div>
			<div className="text-center text-2xl font-bold leading-10 bg-gray-100 h-16 flex flex-col justify-center items-center">
				No.{page * displaySize + 1} ~ {page * displaySize + displayItems.length}
			</div>
			<PageLink page={page} />
			<div className="w-full h-full flex flex-col justify-center items-center">
				{displayItems.map((item, index) => (
					<div
						key={item.id}
						className={contentStyle({ alternate: index % 2 === 0 })}
					>
						<img
							src={`/photos/${item.id}.webp`}
							alt={item.title}
							className="max-h-[80vh]"
						/>
						<div className="text-center">
							<p className="text-2xl font-bold mb-2 px-4">
								<span className="font-normal pr-2 inline-block">
									No.{page * displaySize + index + 1}
								</span>
								<span className="inline-block">「{item.title}」</span>
							</p>
							<p className="text-xl">{item.name}</p>
						</div>
					</div>
				))}
			</div>
			<PageLink page={page} />
		</div>
	)
}
