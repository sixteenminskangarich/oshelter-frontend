import { useFormik, useField } from "formik";
export default function FirstStage({ values, handleChange, errors }) {
    return(
        <>
            <div className="row -mt-10">
				<h2 className="font-serif text-2xl font-semibold text-gray-700">How big are you</h2>
				<div className="mt-5 flex w-full flex-col pb-8">
					<div className="relative mb-4">
						<input className="peer hidden" id="radio_1" value="100" type="radio" name="type" onChange={handleChange} />
						<span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-bg-color"></span>
							<label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16 peer-checked:border-bg-color" for="radio_1">
						<span className="mb-2 text-md font-semibold">Developer</span>
						<p className="text-xs">A real estate developer is responsible for <br /> overseeing development, and sale of real estate properties.</p>
						</label>
					</div>
					<div className="relative mb-4">
						<input className="peer hidden" id="radio_2" value="200" type="radio" name="type" onChange={handleChange} />
						<span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-bg-color"></span>
							<label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16 peer-checked:border-bg-color" for="radio_2">
						<span className="mb-2 text-md font-semibold">Agency</span>
						<p className="text-xs">A real estate agency assists clients in buying, <br /> selling, and managing properties.</p>
						</label>
					</div>
					<div className="relative mb-4">
						<input className="peer hidden" id="radio_3" value="300" type="radio" name="type" onChange={handleChange} />
						<span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-bg-color"></span>
						<label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16 peer-checked:border-bg-color" for="radio_3">
							<span className="mb-2 text-md font-semibold">Property Owner</span>
							<p className="text-xs">An individual or entity that owns and manages properties.</p>
						</label>
					</div>
					<div className="relative mb-4">
						<input className="peer hidden" id="radio_4" value="400" type="radio" name="type" onChange={handleChange} />
						<span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-bg-color"></span>
							<label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16 peer-checked:border-bg-color" for="radio_4">
						<span className="mb-2 text-md font-semibold">Agent</span>
						<p className="text-xs">A real estate agent helps clients buy, sell, or rent properties.</p>
						</label>
					</div>

					<p className="text-sm text-red-800 mb-5">{errors.type}</p>
				</div>
			</div>
        </>
    )
}