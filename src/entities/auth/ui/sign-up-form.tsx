import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';

import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { useToast } from '@/shared/model/hook/use-toast';
import { TOAST } from '@/shared/lib/toast';

import { signUpSchema, TSignUpPostFetchParams } from '../model/schema/sign-up-schema';
import { userSignUpPostFetch } from '../api/userSignUpPostFetch';
import { useUserStore } from '../model/store/useUserStore';

export default function SignUpForm() {
  const { toast } = useToast();

  const setToken = useUserStore((state) => state.setToken);

  const {
    register,
    handleSubmit: submit,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    } as TSignUpPostFetchParams,
    mode: 'onChange',
  });

  const handleSubmit = submit(async () => {
    try {
      const loginParams = getValues();
      const loginResponse = await userSignUpPostFetch(loginParams);

      const { token } = loginResponse.data;
      setToken(token);

      toast({
        title: '회원가입에 성공했습니다.',
        className: TOAST.success,
      });
    } catch (error) {
      console.error('회원가입에 실패했습니다.', error);

      if (isAxiosError(error)) {
        toast({
          title: '회원가입에 실패했습니다.',
          description: error.response?.data.details,
          className: TOAST.error,
        });
      }
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div>
          <Label>Email</Label>
          <Input {...register('email')} />
          <p className="text-red-600 py-1">{errors.email?.message}</p>
        </div>
        <div>
          <Label>Password</Label>
          <Input {...register('password')} />
          <p className="text-red-600 py-1">{errors.password?.message}</p>
        </div>
      </div>
      <Button className="mt-2 w-full" type="submit" disabled={!isValid || isSubmitting}>
        회원가입 하기
      </Button>
    </form>
  );
}
