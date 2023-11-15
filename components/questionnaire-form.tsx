import { useForm, Controller } from 'react-hook-form';
import { Button, Screen, Input } from '@components';
import { Question } from 'interfaces/question';

type MapSchemaTypes = {
  string: string;
  integer: number;
}

export default function QuestionnaireForm({ items }: {items: []}) {
  const dataTypeMap = {
    choice: 'selector',
    text: 'text'
  };

  const {
    control,
    setFocus,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<any>({
    shouldFocusError: false,
  });
  console.log('items', items);

  return (
    <>
      {items && items.map((question: Question) =>
        (
          <Controller
            name={question.linkId}
            control={control}
            rules={{ required: { value: question.type === 'choice', message: 'Required' } }}
            key={question.linkId}
            render={({ field: { onChange, value, ref } }) => (
              <Input
                type={dataTypeMap[question.type]}
                name={question.text}
                label={question.text}
                options={question.answerOption.map((answer) => ({ label: answer.valueCoding.display, value: answer.valueCoding.code }))}
                onFocus={() => clearErrors()}
                onChange={(e) => { console.log(e, value); onChange(e); }}
                value={value}
                error={errors[question.linkId]}
              />
            )}
          />
        ))}
      <Button
  // onPress={handleSubmit((data) => onQuestionnaireSubmit(data))}
        onPress={handleSubmit((data) => console.log('submitted', data))}
        label={false ? 'Submitting...' : 'Submit'}
        theme="primary"
      />
    </>
  );
}
