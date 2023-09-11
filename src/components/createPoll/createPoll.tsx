import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useRef } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(3),
  description: Yup.string().required(),
  options: Yup.array(Yup.string().required()).required().min(2),
  expirationDate: Yup.number().required().positive(),
});

type FormValues = typeof validationSchema.__outputType;

interface CreatePollProps {
  createPoll: (payload: FormValues) => Promise<void>;
}

const CreatePoll: FC<CreatePollProps> = ({ createPoll }) => {
  const optionAdder = useRef<HTMLInputElement>(null);
  return (
    <Formik<FormValues>
      validationSchema={validationSchema}
      initialValues={{
        title: "",
        description: "",
        options: [],
        expirationDate: 0,
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await createPoll(values);
          resetForm();
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, setFieldError, isSubmitting, isValid }) => (
        <Form className="space-y-6 lg:min-w-[580px]">
          <div>
            <label className="mb-2 block">Title</label>
            <Field
              name="title"
              className="bg-transparent border-gray-300 dark:border-neutral-800 border rounded-md p-3 w-full focus:border-none focus:ring-blue-500 focus:outline-none focus:ring"
              type="text"
              placeholder="poll title"
              as="input"
            />
            <div className="text-red-500">
              <ErrorMessage name="title" />
            </div>
          </div>
          <div>
            <label className="mb-2 block">Description</label>
            <Field
              name="description"
              className="bg-transparent border-gray-300 dark:border-neutral-800 border rounded-md p-3 w-full focus:border-none focus:ring-blue-500 focus:outline-none focus:ring"
              as="textarea"
              placeholder="poll description"
            />
            <div className="text-red-500">
              <ErrorMessage name="description" />
            </div>
          </div>
          <div>
            <label className="mb-2 block">Options</label>
            <section className="flex items-center gap-x-3">
              <input
                className="bg-transparent border-gray-300 dark:border-neutral-800 border rounded-md p-3 w-full focus:border-none focus:ring-blue-500 focus:outline-none focus:ring"
                ref={optionAdder}
                type="text"
                aria-label="add option"
                placeholder="add option"
              />
              <button
                type="button"
                className="dark:border-neutral-800 shrink-0 py-2.5 px-5 border-gray-300 border rounded-full"
                onClick={() => {
                  if (!optionAdder.current) return;
                  const option = optionAdder.current.value;

                  if (!option || values.options.includes(option)) return;
                  setFieldValue("options", [...values.options, option]);

                  optionAdder.current.value = "";
                  optionAdder.current.focus();
                }}
              >
                Add option
              </button>
            </section>
            <section className="flex gap-3 mt-3">
              {values.options.map((option) => (
                <div
                  className="dark:border-neutral-800 relative py-1 px-3 border-gray-300 border rounded-full"
                  key={option}
                >
                  <button
                    type="button"
                    className="absolute top-[-8px] right-[-1px]"
                    onClick={() => {
                      setFieldValue(
                        "options",
                        values.options.filter((val) => val !== option)
                      );
                    }}
                  >
                    x
                  </button>
                  {option}
                </div>
              ))}
            </section>
            <div className="text-red-500">
              <ErrorMessage name="options" />
            </div>
          </div>
          <div>
            <label className="mb-2 block">Expiration Date</label>
            <input
              type="datetime-local"
              className="block bg-transparent border-gray-300 dark:border-neutral-800 border rounded-md p-3 w-full focus:border-none focus:ring-blue-500 focus:outline-none focus:ring"
              aria-label="select expiry date"
              onChange={(e) => {
                const value = e.currentTarget.value;
                if (!value) return;
                const timestamp = new Date(value).getTime();
                const now = new Date().getTime();

                if (timestamp <= now) {
                  return setFieldError("expirationDate", "select a later date");
                }
                setFieldValue("expirationDate", timestamp / 1000);
              }}
            />
            <div className="text-red-500">
              <ErrorMessage name="expirationDate" />
            </div>
          </div>
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="text-lg bg-blue-500 py-3 px-4 rounded-md min-w-[150px] font-medium disabled:bg-blue-500/50 flex items-center justify-center"
            >
              Create Poll
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { CreatePoll };
