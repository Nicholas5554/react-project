import { FloatingLabel, Button } from "flowbite-react";
import { createCard } from "../../Hooks/createCard";

const CreateCard = () => {
    const {
        register,
        handleSubmit,
        errors,
        isValid,
        onSubmit,
        navToMyCards
    } = createCard();

    return (
        <>
            <form className="flex flex-col gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-2/7"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-bold dark:text-white">Create card</h1>

                <div className="flex flex-row items-center justify-center w-3/4 gap-6 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="title"
                            {...register("title")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.title?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="subtitle"
                            {...register("subtitle")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.subtitle?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center w-3/4 gap-6 m-auto">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="description"
                            {...register("description")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.description?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="phone"
                            {...register("phone")}
                        />

                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.phone?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center w-3/4 gap-6 m-auto">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="email"
                            {...register("email")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.email?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="web"
                            {...register("web")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.web?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center w-3/4 gap-6 m-auto">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="image url"
                            {...register("image.url")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.image?.url?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="image alt"
                            {...register("image.alt")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.image?.alt?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center w-3/4 gap-6 m-auto">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="state"
                            {...register("address.state")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.address?.state?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="country"
                            {...register("address.country")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.address?.country?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center w-3/4 gap-6 m-auto">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="city"
                            {...register("address.city")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.address?.city?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="street"
                            {...register("address.street")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.address?.street?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center w-3/4 gap-6 m-auto">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="number"
                            variant="standard"
                            label="houseNumber"
                            {...register("address.houseNumber")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.address?.houseNumber?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="number"
                            variant="standard"
                            label="zip"
                            {...register("address.zip")}
                        />
                        <span className="w-40 overflow-hidden text-xs text-red-500 h-9">{errors.address?.zip?.message}</span>
                    </div>
                </div>

                <button className="h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToMyCards}>Go Back</button>
                <Button type="submit" disabled={!isValid} className="dark:text-white">Create card</Button>

            </form>
        </>
    );
};

export default CreateCard;