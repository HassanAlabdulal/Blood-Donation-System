import React from "react";
// import { useCountries } from "use-react-countries";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  // BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

function formatCardNumber(value: string) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

function formatExpires(value: string) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

export default function Payment() {
  //   const { countries } = useCountries();
  const [type, setType] = React.useState("card");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpires, setCardExpires] = React.useState("");

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-full max-w-[26rem]" placeholder={undefined}>
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="grid px-4 py-8 m-0 text-center place-items-center"
          placeholder={undefined}
        >
          <div className="h-20 p-6 mb-4 text-white">
            {type === "card" ? (
              <CreditCardIcon className="w-10 h-10 text-white" />
            ) : (
              <img
                alt="paypal "
                className="w-14 "
                src="https://docs.material-tailwind.com/icons/paypall.png"
              />
            )}
          </div>
          <Typography variant="h5" color="white" placeholder={undefined}>
            Payment Form
          </Typography>
        </CardHeader>
        <CardBody placeholder={undefined}>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0 " placeholder={undefined}>
              <Tab
                value="card"
                onClick={() => setType("card")}
                placeholder={undefined}
              >
                Pay with Card
              </Tab>
              <Tab
                value="paypal"
                onClick={() => setType("paypal")}
                placeholder={undefined}
              >
                Pay with PayPal
              </Tab>
            </TabsHeader>
            <TabsBody
              className="overflow-hidden !overflow-x-hidden !overflow-y-hidden"
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}
              placeholder={undefined}
            >
              <TabPanel value="card" className="p-0">
                <form className="flex flex-col gap-4 mt-12">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                      placeholder={undefined}
                    >
                      Your Email
                    </Typography>
                    <Input
                      type="email"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="my-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium "
                      placeholder={undefined}
                    >
                      Card Details
                    </Typography>

                    <Input
                      maxLength={19}
                      value={formatCardNumber(cardNumber)}
                      onChange={(event) => setCardNumber(event.target.value)}
                      icon={
                        <CreditCardIcon className="absolute left-0 w-4 h-4 text-blue-gray-300" />
                      }
                      placeholder="0000 0000 0000 0000"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      crossOrigin={undefined}
                    />
                    <div className="flex items-center gap-4 my-4">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                          placeholder={undefined}
                        >
                          Expires
                        </Typography>
                        <Input
                          maxLength={5}
                          value={formatExpires(cardExpires)}
                          onChange={(event) =>
                            setCardExpires(event.target.value)
                          }
                          containerProps={{ className: "min-w-[72px]" }}
                          placeholder="00/00"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          crossOrigin={undefined}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                          placeholder={undefined}
                        >
                          CVC
                        </Typography>
                        <Input
                          maxLength={4}
                          containerProps={{ className: "min-w-[72px]" }}
                          placeholder="000"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          crossOrigin={undefined}
                        />
                      </div>
                    </div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                      placeholder={undefined}
                    >
                      Holder Name
                    </Typography>
                    <Input
                      placeholder="HASSAN ALABDULAL"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      crossOrigin={undefined}
                    />
                  </div>
                  <Button size="lg" placeholder={undefined}>
                    Pay Now
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-center gap-2 mt-2 font-medium opacity-60"
                    placeholder={undefined}
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                    secure and encrypted
                  </Typography>
                </form>
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <form className="flex flex-col gap-4 mt-12">
                  <div>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="mb-4 font-medium"
                      placeholder={undefined}
                    >
                      Personal Details
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                      placeholder={undefined}
                    >
                      Your Email
                    </Typography>
                    <Input
                      type="email"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="my-6">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="mb-4 font-medium"
                      placeholder={undefined}
                    >
                      Billing Address
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                      placeholder={undefined}
                    >
                      Country
                    </Typography>
                    <Select
                      placeholder="KSA"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      menuProps={{ className: "h-48" }}
                    >
                      {/* Example Option components */}
                      <Option value="option1">Saudi Arabia</Option>
                      <Option value="option2">Bahrain</Option>
                      <Option value="option3">Qatar</Option>
                      <Option value="option4">Oman</Option>
                      <Option value="option5">United Arab Emirates</Option>
                    </Select>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mt-4 -mb-2 font-medium"
                      placeholder={undefined}
                    >
                      Postal Code
                    </Typography>
                    <Input
                      placeholder="0000"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{ className: "mt-4" }}
                      crossOrigin={undefined}
                    />
                  </div>
                  <Button size="lg" placeholder={undefined}>
                    pay with paypal
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-center gap-2 font-medium opacity-60"
                    placeholder={undefined}
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                    secure and encrypted
                  </Typography>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
