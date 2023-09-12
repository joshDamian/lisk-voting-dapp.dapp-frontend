import { ErrorMessage, Form, Formik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import * as RadioGroup from "@radix-ui/react-radio-group";

interface VoteProps {
  vote: (option: string) => Promise<void>;
  canVote: boolean;
  votedOption?: string;
  options: string[];
}

const Vote: FC<VoteProps> = ({ vote, votedOption, options, canVote }) => {
  const validationSchema = Yup.object().shape({
    option: Yup.string().required().oneOf(options),
  });
  type FormValues = typeof validationSchema.__outputType;
  return (
    <Formik<FormValues>
      validationSchema={validationSchema}
      initialValues={{
        option: "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (!canVote) return;
        try {
          await vote(values.option);
        } catch (error) {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, setFieldValue }) => (
        <Form>
          <RadioGroup.Root
            className="flex flex-col gap-2.5 w-full"
            defaultValue={votedOption}
            aria-label="Vote option"
            disabled={!canVote}
            onValueChange={(value) => {
              setFieldValue("option", value);
            }}
          >
            {options.map((option, key) => (
              <div key={option} className="flex items-center">
                <RadioGroup.Item
                  className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-black/80 hover:bg-blue-500/30 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                  value={option}
                  id={`r${key}`}
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-blue-500" />
                </RadioGroup.Item>
                <label
                  className="text-[15px] leading-none pl-[15px] capitalize flex items-center justify-between gap-x-3"
                  htmlFor={`r${key}`}
                >
                  <span>{option}</span>
                  {option === votedOption && (
                    <div className="py-1 text-sm px-2 bg-blue-500 text-white rounded-full">
                      Your vote
                    </div>
                  )}
                </label>
              </div>
            ))}
          </RadioGroup.Root>
          <div className="text-red-500">
            <ErrorMessage name="expirationDate" />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={!isValid || isSubmitting || !canVote}
              className="text-lg bg-blue-500 py-3 px-4 rounded-md min-w-[150px] font-medium disabled:bg-blue-500/50 flex items-center justify-center"
            >
              Vote
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { Vote };
