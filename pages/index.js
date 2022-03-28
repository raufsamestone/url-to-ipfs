import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function Home() {
  const [imageURL, setImageURL] = useState(``);
  const [ipfsURL, updateIPFSURL] = useState(``);

  async function getImage() {
    fetch(`https://source.unsplash.com/500x500/?beach`).then((response) => {
      let imageURL = response.url;
      setImageURL(imageURL);
    });
  }

  async function uploadFile() {
    const blobFile = await fetch(imageURL).then((r) => r.blob());
    try {
      const added = await client.add(blobFile);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateIPFSURL(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <span className={styles.minidesc}>
        {" "}
        <a target="" href={GitHubURL}>
          {" "}
          GitHub
        </a>
      </span>
      {imageURL && <img src={imageURL} width="500px" height="500px" />}
      <button className={styles.button} onClick={getImage}>
        {button}
      </button>
      <button
        className={!imageURL ? styles.disableButton : styles.button}
        onClick={imageURL ? uploadFile : null}
      >
        {buttonipfs}
      </button>
      {ipfsURL && (
        <pre>
          <code>
            <a target="" href={ipfsURL}>
              {" "}
              {ipfsURL}
            </a>
          </code>
        </pre>
      )}
    </div>
  );
}

const title = "URL to IPFS Example";
const description =
  "A simple example of how to upload a file to IPFS and get a URL back.";
const button = "Get random image from Unsplash";
const buttonipfs = "Send image to IPFS";
const GitHubURL = "github.com/raufsamestone/url-to-ipfs";
