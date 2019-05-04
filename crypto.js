//import the required modules
var crypto = require("crypto");
var eccrypto = require("eccrypto");

// A new random 32-byte private key
var privateKey = eccrypto.generatePrivate();
// Corresponding uncompressed (65-byte) public key
var publicKey = eccrypto.getPublic(privateKey);

var str = "This is Message";
// hash message before sign
var msg = crypto.createHash("sha256").update(str).digest();

//signing using private key and verifying using public key
eccrypto.sign(privateKey, msg).then(function(sig) {
  console.log("Signature in DER format:", sig);
  eccrypto.verify(publicKey, msg, sig).then(function() {
    console.log("\nSignature Verified! ");
  }).catch(function() {
    console.log("\nVerification Failed");
  });
});

 
// Encrypting the message
eccrypto.encrypt(publicKey, str).then(function(encrypted) {
  console.log("\nEncrypted message: ", encrypted.ciphertext);
  //decrypting the message.
  eccrypto.decrypt(privateKey, encrypted).then(function(plaintext) {
    console.log("\nDecrypted Message :", plaintext.toString());
  });
});
 
