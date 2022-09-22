import { toHexString, verifyMessage } from "@andreivcodes/spacemeshlib";
import { Box, TextInput, Group, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { sign } from "crypto";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const PLACEHOLDER =
  '{ "text": "Chaim hates developers but loves me", "signature": "0x9acacce625c5722479967130e1236087d3db79d46cb672324bf4a5699f974b788432c891a680f2246d5d84ca5a9cd4025635805f7a6ecfb558bc15f242d3ec07", "publicKey": "0x2fb9a4250ca6390934bad0cf38db093ce43fe3db88d89568baaeb68a6b5e74a6" }';

const Home: NextPage = () => {
  const form = useForm({
    initialValues: {
      signed: "",
    },
  });

  const [signer, setSigner] = useState();
  const [message, setMessage] = useState();
  const [signature, setSignature] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    async function verify() {
      if (!form.values.signed) return;
      const { text, signature, publicKey } = JSON.parse(form.values.signed);

      setSigner(publicKey);
      setMessage(text);
      setSignature(signature);

      fetch(
        `/api/verify?text=${text}&signature=${signature}&publicKey=${publicKey}`
      )
        .then((response) => response.json())
        .then(async (data) => {
          setResult(data.result);
        });
    }
    verify();
  }, [form.values]);

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto" mt="lg">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Signed JSON"
          placeholder={PLACEHOLDER}
          {...form.getInputProps("signed")}
        />
      </form>

      <Text size="sm" lineClamp={3} mt="lg">
        Signer: {signer}
      </Text>
      <Text size="sm" lineClamp={3} mt="md">
        Message: {message}
      </Text>
      <Text size="sm" lineClamp={3} mt="md">
        Signature: {signature}
      </Text>
      {result ? (
        <Text size="md" mt="lg">
          Message signature verified ✅
        </Text>
      ) : (
        <Text size="md" mt="lg">
          Message signature invalid ❌
        </Text>
      )}
    </Box>
  );
};

export default Home;
