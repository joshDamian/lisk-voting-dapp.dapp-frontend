import { FC, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import * as bip39 from "bip39";
import { validatePassphrase } from "@/utils/validatePassphrase";

interface ImportPassphraseProps {
  setupAccount: (passphrase: string) => Promise<void>;
  numberOfWords: number;
}

enum KEYS {
  space = " ",
  arrowRight = "ArrowRight",
  arrowLeft = "ArrowLeft",
  delete = "Backspace",
}

const ImportPassphrase: FC<ImportPassphraseProps> = ({
  numberOfWords,
  setupAccount,
}) => {
  const validationSchema = Yup.object().shape({
    words: Yup.array()
      .of(Yup.string().required())
      .required()
      .length(numberOfWords)
      .test({
        test: (value) => {
          const passphraseInput = value.join(" ").trim();
          const errors = validatePassphrase(passphraseInput, numberOfWords);
          console.log(errors);
          return errors.length === 0;
        },
        name: "validate passphrase",
        message: "passphrase is invalid",
      }),
  });
  type FormValues = typeof validationSchema.__outputType;

  const isValidWord = (word: string) => {
    return bip39.wordlists.english.includes(word);
  };

  const [errors, setErrors] = useState<string[]>([]);
  const [focused, setFocused] = useState(0);

  return (
    <Formik<FormValues>
      initialValues={{
        words: [],
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const passphrase = values.words.join(" ").trim();
        try {
          await setupAccount(passphrase);
          resetForm();
        } catch (error) {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        setFieldValue,
        values,
        isValid,
        isSubmitting,
        errors: formikErrors,
        resetForm,
      }) => (
        <Form>
          <div className="border-gray-300 bg-gradient-to-b from-zinc-200 p-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200">
            <div className="flex items-center mb-4">
              {formikErrors.words && (
                <div className="text-red-500 text-sm">
                  {typeof formikErrors.words === "string"
                    ? formikErrors.words
                    : formikErrors.words[focused]}
                </div>
              )}
              <div className="flex flex-1 justify-end">
                <button
                  type="button"
                  className="dark:border-neutral-800 py-1 px-3 border-gray-300 border rounded-full"
                  onClick={() => resetForm()}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {[...Array(numberOfWords)].map((x, i) => (
                <div key={i}>
                  <input
                    autoFocus={i === 0}
                    id={`${i}`}
                    className="bg-transparent border-gray-300 dark:border-neutral-800 border rounded-md p-3 w-full focus:border-none focus:ring-blue-500 focus:outline-none focus:ring"
                    type="text"
                    placeholder={`${i + 1}`}
                    aria-label={`word_${i + 1}`}
                    autoComplete="off"
                    value={values.words[i] || ""}
                    onFocus={(e) => {
                      setFocused(i);
                    }}
                    onChange={(e) => {
                      const copiedWords = [...values.words];
                      const copiedErrors = [...errors];
                      copiedErrors[i] = "";
                      const insertedValue = e.target.value.trim().replace(/\W+/g, " ");
                      if (insertedValue.split(/\s/).length > 1) return;
                      if (!isValidWord(insertedValue)) {
                        copiedErrors[i] = "Invalid word";
                      }
                      copiedWords[i] = insertedValue;
                      setErrors(copiedErrors);
                      setFieldValue("words", copiedWords, true);
                    }}
                    onKeyDown={(e) => {
                      const index = parseInt(e.currentTarget.id, 10);
                      if (e.key === KEYS.arrowRight || e.key === KEYS.space) {
                        if (index === numberOfWords - 1) return; // last index
                        const nextInput = document.getElementById(`${index + 1}`);
                        if (!nextInput) return;
                        nextInput.focus();
                        e.preventDefault();
                      }
                      if (
                        e.key === KEYS.arrowLeft ||
                        (e.key === KEYS.delete && !values.words[i])
                      ) {
                        if (index === 0) return;
                        const prevInput = document.getElementById(`${index - 1}`);
                        if (!prevInput) return;
                        prevInput.focus();
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      const { clipboardData, currentTarget } = e;
                      const index = parseInt(currentTarget.id, 10);
                      let copiedWords = [...values.words];
                      const pastedValue = clipboardData
                        .getData("Text")
                        .trim()
                        .replace(/\W+/g, " ")
                        .split(/\s/);
                      if (pastedValue.length <= 1) {
                        copiedWords[index] = "";
                      } else {
                        const insertedValue = [...Array(index), ...pastedValue];
                        copiedWords = insertedValue.map(
                          (value, key) => value || values.words[key]
                        );
                        setFieldValue("words", copiedWords, true);
                      }
                    }}
                  />
                  {errors[i] && (
                    <div className="mt-1 text-red-500 text-xs">{errors[i]}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="text-lg bg-blue-500 py-3 px-4 rounded-md min-w-[150px] font-medium disabled:bg-blue-500/50 flex items-center justify-center"
              >
                Import Account
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { ImportPassphrase };
