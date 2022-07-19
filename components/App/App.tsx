import {
  Title,
  Text,
  Anchor,
  AppShell,
  Navbar,
  Header,
  RangeSlider,
  Box,
  TextInput,
  NumberInput,
  Group,
  Button,
  InputWrapper,
  Autocomplete,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { HeaderAction } from '../Header/Header';
import useStyles from './App.styles';
import useRangeSliderStyles from './RangeSlider.styles';

export function App() {
  const { classes } = useStyles();
  const { rangeSliderClasses } = useRangeSliderStyles();

  const schema = z.object({
    name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
    email: z.string().email({ message: 'Invalid email' }),
    age: z.number().min(18, { message: 'You must be at least 18 to create an account' }),
  });

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      age: 18,
    },
  });

  return (
    <AppShell
      padding="md"
      header={
        <HeaderAction
          links={[
            {
              link: 'Researcher',
              label: 'Researcher',
            },
            {
              link: 'Patient',
              label: 'Patient',
            },
          ]}
        />
      }
      //   Type '{ link: string; label: string; }' is not assignable to type '{ link: string; label: string; links: { link: string; label: string; }[]; }[]'.

      //   links: { link: string; label: string; links: { link: string; label: string }[] }[];

      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
      <>
        <Title className={classes.title} align="center" mt={100}>
          Welcome to{' '}
          <Text inherit variant="gradient" component="span">
            YourHealth
          </Text>
        </Title>
        <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
          Take control of your health records. Get compensated for your data.
        </Text>
        <Box sx={{ maxWidth: 340 }} mx="auto">
          <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
            <InputWrapper label="Age">
              <RangeSlider
                labelAlwaysOn
                defaultValue={[20, 60]}
                //   classNames={classes}
                {...form.getInputProps('age')}
              />
            </InputWrapper>
            <Autocomplete
              label="Location"
              placeholder="Pick one"
              data={['New York', 'Georgia', 'California']}
            />

            <Group position="right" mt="xl">
              <Button type="submit">Search</Button>
            </Group>
          </form>
        </Box>
        ;
      </>
    </AppShell>
  );
}
