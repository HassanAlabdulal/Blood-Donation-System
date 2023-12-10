import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";

export type RadioButtonOption = {
  id: string;
  label: string;
};

type RadioButtonProps = {
  name: string;
  options: RadioButtonOption[];
};

const RadioButtonSelector: React.FC<RadioButtonProps> = ({ name, options }) => {
  return (
    <Card className="w-full max-w-[28rem] bg-white" placeholder={undefined}>
      <List className="flex-row" placeholder={undefined}>
        {options.map((option) => (
          <ListItem className="p-0" key={option.id} placeholder={undefined}>
            <label
              htmlFor={option.id}
              className="flex items-center w-full px-3 py-2 cursor-pointer"
            >
              <ListItemPrefix className="mr-3" placeholder={undefined}>
                <Radio
                  name={name}
                  id={option.id}
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                  crossOrigin={undefined}
                />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="font-medium text-[#121212]"
                placeholder={undefined}
              >
                {option.label}
              </Typography>
            </label>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default RadioButtonSelector;
