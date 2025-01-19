import type { MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { tv } from "tailwind-variants"

import docs from "~/assets/docs.json"

export const meta: MetaFunction = () => {
	return [{ title: "2024 - フォトコンテスト 優秀作品" }]
}

export const loader = async () => {
	const selectedItems = docs.selected
		.map((info) => {
			return {
				...docs.items.find((item) => item.id === info.id),
				grade: info.grade,
			}
		})
		.filter((item) => item !== undefined)
	return selectedItems
}
export default function Index() {
	const loaderData = useLoaderData<typeof loader>()
	const selectedItems = loaderData

	const gradeStyle = tv({
		base: "text-3xl mb-4 font-bold",
		variants: {
			grade: {
				1: "text-amber-500",
				2: "text-slate-500",
				3: "text-sky-500",
			},
		},
	})
	const contentStyle = tv({
		base: "w-full h-dvh border-b border-zinc-800 snap-start shrink-0",
		variants: {
			grade: {
				1: "bg-zinc-800 text-white",
				2: "bg-zinc-100",
				3: "bg-white",
			},
		},
	})
	const imageStyle = tv({
		base: "w-auto max-h-[60vh]",
		variants: {
			grade: {
				1: "shadow-2xl shadow-black",
				2: "shadow-xl",
				3: "",
			},
		},
	})
	const mapGrade = (grade: number) => {
		switch (grade) {
			case 1:
				return "大賞"
			case 2:
				return "準大賞"
			case 3:
				return "入選"
			default:
				return ""
		}
	}
	return (
		<>
			<div className="flex h-dvh flex-col items-center justify-start w-full snap-y snap-mandatory overflow-y-scroll">
				<div className="w-full h-dvh bg-gray-100 flex flex-col justify-center items-center relative snap-start shrink-0">
					<h1 className="text-2xl w-full text-center mb-4 py-8 bg-zinc-800 text-white shadow shadow-black">
						2024 フォトコンテスト結果発表
					</h1>
					<h2 className="text-xl text-center px-4">
						<p className="mb-2">
							<span className="inline-block">2024年度2学年見学旅行の</span>
							<span className="inline-block">思い出の写真を募集しました。</span>
						</p>
						<p className="mb-2">
							<span className="inline-block">たくさんのご応募</span>
							<span className="inline-block">ありがとうございました。</span>
						</p>
						<p className="text-zinc-600 text-sm mb-24">
							※応募されたすべての作品をご覧いただけます。
						</p>
						<p className="">公開期間：2025年1学期末まで</p>
					</h2>
					<h3 className="text-lg py-2 absolute bottom-12">
						<p>西高PTA広報委員会</p>
					</h3>
				</div>
				{selectedItems.map((item) => (
					<div key={item.id} className={contentStyle({ grade: item.grade })}>
						<div className="max-w-4xl w-[90%] mx-auto h-full flex flex-row flex-wrap justify-center items-center box-border">
							<img
								src={`/photos/${item.id}.webp`}
								alt={item.title}
								className={imageStyle({ grade: item.grade })}
							/>
							<div className="mx-auto text-center flex flex-col justify-center items-center px-4">
								<h3 className={gradeStyle({ grade: item.grade })}>
									{mapGrade(item.grade)}
								</h3>
								<h2 className="text-3xl font-bold mb-2">「{item.title}」</h2>
								<h3 className="text-xl">{item.name}</h3>
							</div>
						</div>
					</div>
				))}
				<div className="w-full h-24 border-y flex flex-row justify-end items-center shrink-0 snap-end">
					<Link
						to="/0"
						className="px-8 text-xl flex justify-center items-center h-full"
					>
						すべての作品を見る
					</Link>
				</div>
			</div>
		</>
	)
}
