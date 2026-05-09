import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

type MSRWizardContextType = {
  formStep: number;
  stepCount: number;
  next: () => void;
  prev: () => void;
  register: (id: string) => number;
  unRegister: (id: string) => void;
};
const MSFWizardContext = createContext<MSRWizardContextType | null>(null);

function clamp(index: number, length: number) {
  if (index < 0) return 0;
  if (index >= length) return length - 1;
  return index;
}

const useFormContext = () => {
  const ctxt = useContext(MSFWizardContext);
  if (!ctxt) throw new Error("");
  return ctxt;
};

function MSFWApp() {
  const items = useRef<string[]>([]);
  const [formItems, setFormItems] = useState<string[]>([]);
  const [formStep, setFormSetp] = useState(0);

  function next() {
    setFormSetp((prev) => clamp(prev + 1, 4));
  }

  function prev() {
    setFormSetp((prev) => clamp(prev - 1, 4));
  }

  const register = (id: string) => {
    let registeredIndex = -1;
    setFormItems((prev) => {
      const existingIndex = prev.indexOf(id);
      if (existingIndex !== -1) {
        registeredIndex = existingIndex;
        return prev;
      }
      registeredIndex = prev.length;
      return [...prev, id];
    });
    return registeredIndex;
  };

  console.log(formItems);

  const unRegister = (id: string) => {
    setFormItems((prev) => prev.filter((item) => item !== id));
  };

  return (
    <MSFWizardContext.Provider
      value={{
        formStep,
        next,
        prev,
        register,
        unRegister,
        stepCount: formItems.length,
      }}
    >
      <div>
        <StepIndicator />
        <FormStep>
          <PersonalInformation />
        </FormStep>
        <FormStep>
          <AccountDetails />
        </FormStep>
        <FormStep>
          <ProfileInformation />
        </FormStep>
        <FormStep>
          <ReviewAndSubmit />
        </FormStep>
      </div>
    </MSFWizardContext.Provider>
  );
}

function StepIndicator() {
  const { formStep, stepCount } = useFormContext();
  return (
    <div>
      {formStep + 1} of {stepCount}
    </div>
  );
}

function FormStep({ children }: { children?: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const id = useId();
  const { formStep, register, unRegister } = useFormContext();
  useEffect(() => {
    const i = register(id);
    setIndex(i);
    return () => unRegister(id);
  }, [formStep, id]);
  console.log(index, id);
  return index === formStep && children;
}

function PersonalInformation() {
  const { next, prev } = useFormContext();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  return (
    <div>
      <Text as="h2">Personal Information</Text>
      <form className="space-y-4 mt-4">
        <div>
          <label htmlFor="first-name">First Name:</label>
          <input
            value={personalInfo.firstName}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, firstName: e.target.value })
            }
            id="first-name"
            className="border"
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            value={personalInfo.lastName}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, lastName: e.target.value })
            }
            id="last-name"
            className="border"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            value={personalInfo.email}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, email: e.target.value })
            }
            id="email"
            className="border"
          />
        </div>
      </form>
      <div className="mt-4">
        <Button onClick={prev} variant={`ghost`}>
          Back
        </Button>
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  );
}

function AccountDetails() {
  const { next, prev } = useFormContext();
  return (
    <div>
      <Text as="h2">Account Information</Text>
      <form className="space-y-4 mt-4">
        <div>
          <label htmlFor="username">Username:</label>
          <input id="username" className="border" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" className="border" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input id="confirmPassword" className="border" />
        </div>
      </form>
      <div className="mt-4">
        <Button onClick={prev} variant={`ghost`}>
          Back
        </Button>
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  );
}

function ProfileInformation() {
  const { next, prev } = useFormContext();
  return (
    <div>
      <Text as="h2">Profile Information</Text>
      <form className="space-y-4 mt-4">
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" className="border" />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone number:</label>
          <input id="phoneNumber" className="border" />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input id="country" className="border" />
        </div>
      </form>
      <div className="mt-4">
        <Button onClick={prev} variant={`ghost`}>
          Back
        </Button>
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  );
}

function ReviewAndSubmit() {
  const { next, prev } = useFormContext();
  return (
    <div>
      <Text as="h2">Review Information</Text>
      <div className="mt-4">
        <Button onClick={prev} variant={`ghost`}>
          Back
        </Button>
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  );
}

export { MSFWApp };
