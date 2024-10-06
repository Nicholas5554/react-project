import { FloatingLabel, Button } from "flowbite-react";
import { editCard } from "../../Hooks/editCard";

const EditCard = () => {
    const {
        cards,
        onSubmit,
        navToMyCards,
        register,
        handleSubmit,
        errors,
        isValid
    } = editCard();

    return (
        <>
            <form className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1"
                onSubmit={handleSubmit(onSubmit)
                }
            >
                <h1 className="text-2xl font-bold dark:text-white">Edit card</h1>

                <div className="flex flex-row justify-around gap-11 w-80">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="title"
                            defaultValue={cards?.title}
                            {...register("title")}
                        />
                        <span className="text-sm text-red-500">{errors.title?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="subtitle"
                            defaultValue={cards?.subtitle}
                            {...register("subtitle")}
                        />
                        <span className="text-sm text-red-500">{errors.subtitle?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-around gap-11 w-80">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="description"
                            defaultValue={cards?.description}
                            {...register("description")}
                        />
                        <span className="text-sm text-red-500">{errors.description?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="phone"
                            defaultValue={cards?.phone}
                            {...register("phone")}
                        />

                        <span className="text-sm text-red-500">{errors.phone?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-around gap-11 w-80">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="email"
                            defaultValue={cards?.email}
                            {...register("email")}
                        />
                        <span className="text-sm text-red-500">{errors.email?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="web"
                            defaultValue={cards?.web}
                            {...register("web")}
                        />
                        <span className="text-sm text-red-500">{errors.web?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-around gap-11 w-80">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="image url"
                            defaultValue={cards?.image?.url}
                            {...register("image.url")}
                        />
                        <span className="text-sm text-red-500">{errors.image?.url?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="image alt"
                            defaultValue={cards?.image?.alt}
                            {...register("image.alt")}
                        />
                        <span className="text-sm text-red-500">{errors.image?.alt?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-around gap-11 w-80">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="state"
                            defaultValue={cards?.address?.state}
                            {...register("address.state")}
                        />
                        <span className="text-sm text-red-500">{errors.address?.state?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="country"
                            defaultValue={cards?.address?.country}
                            {...register("address.country")}
                        />
                        <span className="text-sm text-red-500">{errors.address?.country?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-around gap-11 w-80">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="city"
                            defaultValue={cards?.address?.city}
                            {...register("address.city")}
                        />
                        <span className="text-sm text-red-500">{errors.address?.city?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="text"
                            variant="standard"
                            label="street"
                            defaultValue={cards?.address?.street}
                            {...register("address.street")}
                        />
                        <span className="text-sm text-red-500">{errors.address?.street?.message}</span>
                    </div>
                </div>

                <div className="flex flex-row justify-around gap-11 w-80">
                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="number"
                            variant="standard"
                            label="houseNumber"
                            defaultValue={cards?.address?.houseNumber}
                            {...register("address.houseNumber")}
                        />
                        <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>
                    </div>

                    <div className="flex flex-col w-[100%]">
                        <FloatingLabel className="dark:text-white"
                            type="number"
                            variant="standard"
                            label="zip"
                            defaultValue={cards?.address?.zip}
                            {...register("address.zip")}
                        />
                        <span className="text-sm text-red-500">{errors.address?.zip?.message}</span>
                    </div>
                </div>

                <button className="w-full h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToMyCards}>Go Back</button>

                <Button type="submit" disabled={!isValid} className="w-full dark:text-white">Edit card</Button>
            </form>
        </>
    );
};

export default EditCard;