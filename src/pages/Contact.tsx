import ContactImg from "@/assets/images/contact.jpg";
import { ContactForm } from "@/components/modules/ContactForm";

export default function Contact() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src={ContactImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <ContactForm></ContactForm>
          </div>
        </div>
      </div>
    </div>
  );
}