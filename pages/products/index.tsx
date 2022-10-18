import {NextPage} from "next";
import {useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {styled} from '@mui/material/styles';
import Header from "../../components/Layout/Header"
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/features/cartSlice";
import Layout from "../../components/Layout/Layout";

let data = [
    {
        id: 1,
        name: 'Iphone 14',
        price: 30000000,
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADkCAMAAAC/iXi/AAAA1VBMVEVHcEwJARYLARgQABsJABQKABUMARkJABMBAQ0DKVoOABoFAhMWASETAB4EAxUCBRQSAB0DAyQIAhUTAiAENGMCAxD5AOwGCDYYJTX2AOjlAO6qAN7SAOq+AOX0AO8TByMDP24OAUsEPWsBPm35AO+cANNeALqKAMkWAV4hAm8FGDoLEzgDJ09eAKsDHT8DIkc+AI9OAJ0FGUT7AO4vAH8DQHAXRG13AL0GNGkLJ18TCSJtAdE4AKcASXwPCh4jAI8AQXYAUYhSBFZyBIBSCnSUBJQAAAFveszeAAAARnRSTlMAt6mZxL6xyf0godRwitvokv7OfizzR/oVP3ath5pmXVL8OmVXvtrN+varxnbkmYnv6+VP9EUL2bzTU8PlfEPyo4yNca1T9dw4+AAAIABJREFUeJztnXdf29gWrqOuqCOhmMyciQMkDGAGEqccMAnJpOj7f6S7yq6STJF87u/+cZdkWy4IPX7ftfaWrPLs2f8PHZ93EAe7mMnnz7gsO8c72L+7u9tsNstsCXdylLGUd0v16tKaxrvlMoNosqXxh1ODFmNzd3e0f7ArxIOjTdbknpdAuMlD4W75VOhWDczFDQMfBxmRb0QwMkT6UxENOBH5QeCESdVkd0e74Px8t8yTxMvzvNkeGY6ZfGhQMZpoxAtNnmdZUpdxF3fbI45jvuEgx3s/X9Zuszyazbi/zF0P+BgRJ0Q0eZNbmDTgmKlHFfBJp71veSdH3AbN5jmKMZ3xaImIMFzlmk6MDEr3gpjQFOYFTVzAq1XmMWJcFn64o/DTknVuk2yWmEcZZBJwVOTWLFuyMEsx0rAUrwpFs0zJeMHUWZU5uDit+/P3SzNevIBxEB/Uwwc5LQP/4uULPYPfP0P88mJnDuV+5qJWgIhVcbnMhsGwS363kWoadm2AMQTG2PttA8Iiv5Q8Hz70cCzqDx8kL30v1hf1u8J5B8v9qYwHmwTwqqrKG0DwXCd0YESrnNPNDc/dEO5hcKHSIWfTWIScjy4sR/nTAMQRF/gDE9LwM0yLsijoxsFT5z9fvPnw8sMLrSrpaWCWQOkup+bkpvJAR6/Ks2Xj+IHjuu45Ip0rTLohLYTjVtkyk1I26pY3YKnyt8mofcoLD1L9bLcV3vbHC6kkc/JXpOMOKNv8bqKQZFbPg+rvRkgIAY3lOTR55/wsgUdoFF0hrhM2S40nospSWAZDx5cGIRn1w4c3b35TbomGwWw4YLL9/YY+9kLJSWY3tIQPRdm09vIOfJpXXpVlfgRtuINDCO18hYoCHw704EFS5ihx6FRLXV+5ifRQyB8jBYcUlPFD4CEUN5RCxhamfryB78GitPPyJfx1PEVKsPgyhIRERuhdRFFUwD9s27IOoe/jYhqSlnBrltjny1BQJwRKS8o8c7qusBZKKylkfPPmw3nHDb9QUWoZL9bwFVX0oQ89THOeYNhgUlbuNwnoCGYN/SBNi5Z7I9D6+q7nUnq6WHlcb7m524eObQPcjhPkS6u05g0sQDWCKAiJ8c2bH51UMI4Nv8ak5E/+zBv+k7Hq40HWZ88nQN7lXl4lXlYhY4lOavn/tykIeI6EWHNASIA8gh44piaUX8OrMEFl5/cQEQcmxLtXH0pBFdNNQeJU+eKV/JzA/NDX8jeWnilt5R2UVS/Jl0EAtT1W/x4rQY397ZBHN8PVAVxH4az0c92cNtixB7ea6fhCp+MbqSPEz3Jbx638qT4kclNR6tmW0A5Pqa8bFyC9LI+ismjRRWTYligDj5pHLKluc4d2BUpWEqXUvdg8dyFdrKKjEJVXX2G8+XW9Golfv17B+29wYMw3wrIfLMP6XRduJiTlJsSUXLp+UZacjy1lCE4Urmw2XMfbHB3tHx3dZdSjdFZBs5R9dEjJHOrOua3jixeajwkZEzCY5pV4jd5+o6dVZr5Rjaacczit8hwgJLg18suyJQlLgGTfxqVDkOTPsAG7HkFPnvpCYRB4S706kjeRakCMkvOG6uUrkxDijz/+wBvevRKTf6g3mdaoQJZjISmi5dNbyoMlQWZ1VBBk14JrF2uqQF0buWptwIHGcbNswgCB4VmQaCGbqqk1pKqqUsQ3FiLd/nglKfkFg1K7VnlWUUJ1TidAfs4IsqlrUJJqa1GVixsEhvaydgPRjQUs6PE5uKZOkEEQ6hVKgEwlJAupmkYD75VQbSyGekoxreozERKV9BRkiy1H0q1uhJIpCIdIotgAosPdd4SU65WNCSl6OR+sZGSTbkfUpKaeUkuj8zMVsnE1JNs1jUu0Kxba2kEsoILK4xAlPSdIR7SRNuRLy6tKRxvxP2b88Z8/cBwBtTAV5ITe60EFkG6eI2TJ/RCoO9zvicso8B1e7wpcsa7pBQLXycVmHmwmKwEpegB9ES2+P2ikmzExhinLjyqxAFk0E5V0mzytqQlpqaFsuevVFr4fCClhNZK2gWSbpRewpHkm17eUkrquasYtAo6GJjVS03DsVCWzsFKQouPK/coYjBtFBImV1PNT0LqoXVzrhDUVP8ihWy46BB5D8hpyD/HVOOFfMAwYDc6eZbl7NwMycZsmjVKipL4O9V3jskjrCCULkqaKWrGCFBfJElZYwMcISZsIGgVp1hxLRgsP+P4Sdxw9XotTQaKU0yE9zMm0rkEpXAlpu5b66GVRpCkqCXU0gaIEPaGSHspw2eAG4UptoTQgRT6ahP/5wwRUXH/1pk1SS02Zly/nQIKSABnVaFiybMdAJUJCUgaeB3D4Ar8ft8kygWyt1EZmmZO8CUAxvuqJOKAbhllyDS2llDOUJMg6IsMiKMHiBiZgBMjQKzQj1eDyKvO1ksqusuZQwyGScSAhxp804J14NBQdE5Mw4RucY1cFmaaFJClQxxqF9N2QGVsa0bJtsAwRMpdNiIAUjYf2qi4yBiDB0Y3v/mTUQYYaakotdwAZ1UBZoJAFqAhlp8bfXQI3hV67ZEQfQ/FZelHgqZ8NlJKGVw1EQ8D7QksqObnZVC3JbiCRMsV6A2OKjAjpOAWtmpQpQK7XCBqXTYOQufgNSCkphTRk7JlUx1sc3/Y4RzBfCS2x+MwtPKgaUNbISYHUPkGCdABZYDu5vqES2yYZQ9pKSiFHEE06YHsr7t7ylC2oVYPYsaAlrl7uxK4+UdYU8kdCJ2DIm6JYF4c32OkzIcmzDElFx9Kxj2ii9cNAtThFXpJhdwDJP3wyIelItyAosD/blnXbrm7W1LNtK2lXU8m+jr1M3IpngNqY7Fmj+OwCkuqM41Df1KfnwAyQuCUW/Io5ickJwkIXSOVkY0BqRllRdQpqlr/f/q0CJkc5DTGVljMhK8pJjJR+f0nBpREF9OzqtmuZk6Nr68z1A49/lc4MSENHS8VxPjO2YZKYknI6pMOQKdo1SqELTm5NU98BJWGq9n32q8SEJ24GNk7ox0wDUiakYVUbcZxvhNTCVI6ljdNzIAu0aw0NZNmKNZC0DkQdClLaxCUoYSptktpnyMawq2Y0ZBwD/O/f/4WgO7gf5RynnA/pRyVuXpbbXsGyQUSaRkAZMyVtji2qHM09ULKno6lij08SyoBnA84+JX6F0yGTxK0gJ33eNtDyelZLP/z7NTWcQFmK32kAtPDyCDt8Wsk8zxiSVzm2IfbIBjGqpqXlLCURMuKtyx2Zkta4itTnDm3qB7jFEp1aln5V+ZTASV5JuwpILjpUV416qkQ04x+M/+IIwxC0hzkbMhBKpmLrcokD4ZawFkJKQjc2AOtihy9wPTciRgMSOgUSknU02owh4T/DMI1rYuq+HlPOg/R4Gw+uKzMkbZMs6wAQa+rKgj8d2pjuwzS1N0llQcY/dNFRVu0TnkgFNZ+cOPmnJ6cWk1sSmP2vWZBJKjZJ4rpU3K7FkxQgCZO67dy0cFd+CNn9EIy6qtqpOBTwvbhJWOVcTWnm5VxILxVuLYv1ebd3syLDtqlfMyOvniBpil0+f1xJ1lHL+NaQ0RLwvRX/vFeokvPvHqcw7CxIzytS2tralsV50bXXK0JuiwiVlGriWJOORJl4CpI3f3BCopB9p/6zBc/gHGBamUlazoMME2gnefNNWa6KrrxaISNueOV1L9JTWTVKSUsDktrJXyik8urftorsTpPrHQ3v6aYlRcoT07QC8k8y7CxIlyGpX4M5CYWUvRspIUVepkLIKApwz6WczKogWcfbP9/e/n07UFHRDUKBStv2KG+lYWfZ1fWwBSlRPGwOaTMHbXklk9JQi92nUuq0g5AOQvJ+lQQZMyQgIqOU8URk4pDwI40mqgA1Of+GL+tWVp+ZkKEXFNiEYB5SE9LyzwSFTEmwKG3cgs5tJCIcKimEfHv7VjCenJgqKjox4PiRp01OISe7FqUEyluWcjqkR/s/pFB5Svp9mTrhuO2VtrwKHWu5G1zJaVk7bpjIHWSlkgAJViWvmoimhgw2DFtObjhNLcmxcyC9BBp5aPJb8bsWdlKp74o/FEhIFhIi4k1ebhhWagdgVpJaj1tYpltqG0+ohf/HJlSMZ2cfz/iuD6owT06QE+eHWXkL3+EsSNfBjgx1BORuRC1vXpZSRqncIFtjTtYu7W0u9/RNGPJPUhIxUcYTG1HRERwDirEPamKeEOUtzPj2r7+u50AmoeNEhfiZgNcnaVM6dXNYyVRuWefNPxXksdybWeYkIoKS6NUTg9Gy6ZkZp+pOg5qUMIsTSE0yBzUjcyBBytAJ0oLB5A8FZaGV5N+DBGNd++Bwl/dPJ7vSPpK/YDluKQgR4sv791/eGTJquNPTQ7id8k1B9zD/eY/fFGpJAbkwx65M6TOliqJMdQOCWiI0duqA0XNQSLVjOvV4bkhGZPyvktFAlHgIhnF4dniqQymqML+8h+/oPVGe3LJh/5yhZOUloIwT+GkhqwtBpjolBWdEv5g4OTAmYmd86tXlQkmkPGEhcRG/vJeISkCGA7zF6SE8YpweGqiMyY0KYnJenggpb+YoWXlMWVu/+BTCqqm+g+dhVbmSUR1dkZGS2qzoti9fbEQhIJCtDzkWglGBninMj98IEziR8vaEpZwF6XHxwa2tvLZB6Ui/MxvhOKGLsofY2RGHVeS8iz6uhTAkffHvUYQv7769+yYQhYinhwpvwYhqAnEtNb8JLb980VICZDEVskIpufrgRuWIVjUCQPEqI0hvFz6EqOrAGHxgu76TkF/++cJO/SZlFCIqKr7jYMqF4Vxl2m99LdfTu3WeDGpKTOXGIkR2dYCMVrI7eyshId59IRmpFdSEhEexR+NCky4WhpwG5TucG8zzdi5kRVnpiTKLu1wFtEfSgC9EQq+qcvNAIJmTa0T8QoiYj98MFbVJF5JxT40MfLgwXctifgPPfnn3nihJyl0o6fExd8PA8is+RoSVwaiUXGshwamwgLresIgKrxfMKSQ11UTKb0LLLwD5dj0tJ5/3IAmUBh0Vw3GC5pVCbORNQQohAVHoaOUiwUgFDUQ5wQna8yxQEuMtGrZEJZ++E/pmBFJWIq+yCk+uEA27GkqW2EaSWTEdz6SOUsW9MRFN1IUAXWjMj4qSHHu7QMjNkyGXDUKOcLJ0ijOXDyaiPACRIRe3XHO+kI4G4mHfpjEMezHcY/AzJarh2TO2rKAEKU9ahFxOUdLtM1ZysHU0lbS0hDcQcu+EE/IbutWwKi61RiQoAtyL9RPFubewxBSU375wawlrgWnzdCU3DUCOhaD0epwC0FazorWQ7h0zMqIto4EooCRqrF8zc1NQirT8JtqRbppdhZJ2raGUrASi5dhcSJqPKCkggfKj0XIYMppMMvbUg6bcM7QEy0opv9x+nAGpCMdLqmfqKa1q5iZ0ZknJMyHkx17FMXxqAQ5gEVVhGo5lypOTs8mQPuVkMkRUetp5qe4MKQWkNuuIV/tYnbqTmHvKtQtLTKJEv5528VRI2dz3c1IoaXMqwsp0K23+6A4ZckxHbcx7w3CtbDOJUhj2cKKSS4L0BGbSE1ISeppP6ygciw+s5EIKyflIzb9k3OtTdrF1aJpp2xHHMuXedLsqJbf2CuwqaxRZQSkKT/zti8F4qBtHi6+TRuXjwjrjDaWmakskJVXYb/EcJT0x2m6txoqP3VgKPUUT0iEkmbXn1R6jNY4oqh2rKL+Bll+w7kwuPLIT3m9HmLCXkwanajI96vF03SlCnp71zKoY5UbdTh1TKA/+NZUccyz79XQmpFjNGK2xovzY3QIDs1KQe8D47UybdVBV1TG+Bqhx7K9Zf2wtiXJvvpL9dQ+FOOjkmYg0SMj4jDPSMKtRbzp1ko+4Mx8krNbUaklEhYU1t24upKerj+VYNSrQXNefvpLd4UBHjSi5BoRCyK6fmaaUZ6cfvx3OhhSOTQY9H1ljB4Y1SpCC3BOQqrDGUknrYPQxIRnWLLExaXko/Hr6MZ4O2fjGaXW8kfIjiqxqTQaNSaXt2h2e9RJSIsZ9xJGIRYqaeYmOJcqPLORsSN724Xn95LQAR9ajtZLd4kwKadecoW5bMK2GJFYVFqTcmwmpS4/MzZGuQSVlHLQpBmR3aAopvDpizXFAMWE3lzAvKj3dbpQ0BB0wVoZ7B5gG5N6pqqwK8bGYCrRfexBybw4kFB63T2iKqbuzldp02e+2Jxqyo86OVVgHFech0l5zyYaV7xZTId3E7Qsp8YbJOewdwAsaEry11+vqPIXQ4FQVFiGlkJM2fywbn0/R0ktLVW2Hnq0krHSuBRnLLQHxRCHl6cHiTvVh97SQEzdk+aFFqUk90XSObjDQUno2JElpCNk9GbIzHUuQh4d6DlPsekd2xbQ0OXVmWnlptCZmD8HzeH1SxOKw3y1/KqLs+8g+7OlCv1lkTz8vxkEWkZIM6PbVVD29Qa9WJygMoQkZs5RcXKfoKECVlKeHxhvTfgvxQ1eUnuEZBT3VD+r5VZVamkosJbv29DC2cnICoaw9MByemnOYBhmFrqQcpqbs6I12aVWfrwfZLdZqy9xIn/WpmGd75jvTlUyEkuPnkBxuOFAb88STHmR3un5Kn3WUUVWes4X11rRfmoWSfJKoRA99PQdKJqGSMuxBxmv4+qeaVa52MenZ2p7FLLty8RkT09Otp87OKvHrVOH2lezas7Xu0U3BFPm8d7PuzWEepFQyUbV2QGqAulGaRrJ3MITs2pszedbPSZhii97Hs/6fz4VkykEJMjtBSkrc9yXQxh1AggY3UxnVtwPz2Ou/OduunJPcmAy6B7LhJMowrYvauwcy7hY3Nwt57rYJnMw4/OtphcfXSrqmpgJwWIEwwKy1ex8kRPvuVzuxL0B/1V5fj/zt5CbEyEqzvKqHXmICVlr7bvUAZNfd4O4aU2N9ezP28gzIgZqJWgEzMb2E3Ax2TTz6xP2Q3frXmBgPBgp5/Wv8C5qck2EfMBHJ6fY6e26AB6hFjpuEAe1qxz9Tb4Xsyl9blvWBWP/6tRhff5ncGbAwE7vYJkapxXZDHgMjD9QPaUeubZBdvPpx/eTTMLfXP0ZKDscsJccMqz3LjOoACkmId8m9kF1c/vq5dYnHY/Xj19YTFU6GDIWSoaGlRDQLUaB2DU1rNUl7HDjbIVHMnz9XjyaM/Z8/b+4pyTMgh0IahpWmVfsxy0PUJON9SgrM3+GjTFue/xZfyDbMiTnphPq0mGbHwLItcDpFOgg/od3x7lUSlzj2f/z+sXrAtW3w8+eP+oEPTVTSkXjiThk3kd0gNq5v0gkhHe4dPASJnGkFCMH2s4Kufvz8+at4aDazIDXoSIPJvPr4QoVZuNwBehCSummg1O/fP3+sitZWqy2CH/DOj/Qx9Wmekvpu0GqynnXfqwiZPFpJ5kkTwEHUPKFTjv9APHgaFo+swNNzMrSVHCqKxScagQy5bXkEpBFtGQLay/2Xz18S3/b2YiSmKVlLJRFN3kYsm4xB+txhfwJknLrN8jWe8nd5fHH8GqZeLy/cRzl1NqQMVxq2X2cT1+9XV3zOXYXgcZB4zru7TVaFdSnTEq+T4XjNcrP0HqqrcyE1Xiiq7IicsgkpaKDjfYoich9r17hwl8vMLcbayxjebDbL5BGJOS0nGdIVd64pZ09NSZeKY3+IsnYfBRkHzfLKv7dD0EbNsvEfwpynpELlKbv8EGfEB6gRZFGkcnAfhmydLHtMfSndLHsAcz6k7vgY2akiLFg8QScefPgC7oeMATF6mJA/62cX92JOhnSGSqoukKlnLc2qZCxIyPsho6x5uCNjRN3gGZy3xZyc7IWrktMMh5UUmDyikO491bX07lvk8fAbb2v2zlDS6TMaUhqgvs5EFhXrzn05GUdNOGEDSDvckLsDyNDC1KXWFSVI5mekbCos61BJ2qZk61ZP6QqZLPmWdbM5SvbS0tVyKtPSEz6ngjgutigCXlPZomTpuZOvQNW6yejfTs5JYVjbs64euTlh+0LnjrfUBnUaOWJtbFzJsnpsTR2NyBtrdKYq6ehLE/Vd6xp62v09vbrpblEyTZ7U8x5GmYxU5emQSsq+ngpR1qHRzSThGGTqzmTEvsGQciKkOH97KF0bOhrQaFGEZVXLaeKO2DXdxQXhWmdAOTEnA2lXnZqOLaUqRjpDrU5COIQsgl1c9C5u/bK3SWuOko6oscMapLrs5qYDWW+3KVlGO7qwH1LuCDJUjnVUgzLeETIklV3bcKhkuytGvD6CPavpdtVHLZul1nFNTVVPL1SMCrMHGdeza46aVVfaK9MzIcPeOKql0bTI3BwoGRfl1B9fB4gxnsRqh5Amq8xLsy9k1VvlXIK1Icv14/dVfhATYm36Yjpk0MMMrXrrhI4b2mF1+UIbcq+Ytv/nGCJrae4BMhly5LQJdu/AGXSH7HJrQZaLqTvwjGFiLAwpp0L2pAxVtRVPmNNVE1ZuUvgaMm7Lvcm7KQ0QeV/JdqEr7Cwl+2qK0iNrrbnK6di56dqQC72n63xIse/ZQu96NgOSxBwkp5GUUkYbV66RGZC4j/3EnbIHiEyJOzBrw062q8Acj9CEHTQrfHVRDdkuzGNeZjLq3ZcXCzmziZB4nR4xGraVmalbTkPJPqqCjEtj//PZWSlSkne2nw/psJyMOBBVMDp2C6pDK7m3XuxKyt5+6FLK6ZCBZuw3mVpPIz2516dANaQ+onAHWmoh6TDuOZCpr84wZJaf0bZTdOL7llWQ8WJtUs5iNIWEma5Fj2AWpD6f0kgZCm1OoxCxpJGABEbbr5MdG0tKkZIw470dQEodA0eeOGrYpBg9BLkRgczra0h5oNa84qP2QJdCIuZkyM+Wko4hpUYcrKY4jqo/rKSAjNeHi76Uk/ayN46i3JNCCr/OtKuosBbleMENzRVPvBOQi/Wh8qs+eHLKAT79jCTKxQ4gNaZMyh5iMKQUkJiTgHJ4s+bKQ107ddDE0zCNI5v5ONFWMN7sBlL4lYut7B5YHaL+VgTRfnLhidcYi0XJBzTH0xoS86wnXHVadivvcz8Z0qqvjkJV/aBAti1bWhUB2TLkGihbQakOD3kkaP/EES0LucBEmAk5DFllVXdvrPuue0IMuXdzw5AYrXVI82OOvtNnBZGQqCMwliTkmve6n6HkGKgtpd269FAZck2QUsq23cPrchiH+hinFBgDHJw2AoUExna9EJCLGZBIOE5p0eqG1ODjBsWGXKxbUhIWUVyj3IpOIhuIvRPWyJKD88EcXzPkejpkhEqSmOJu6FxbUNu5iFlTdYXFIMp1ScWnxYwCSvuYWHF8UqfuYvv0JtKp9Ndk1t1BbrWsWYwcu4XRwUoi4w1DwgAjXl7FwjRzVB2uFsdWveFyBYwYCFgKRIg5dvUF4aiSfc+KtDRBA1Syi2k5OCtLrD6UlziOnwOsb1GJCB8nry8oH8uSKWnm8SxIjuDB5Az0amfQV3LvRklZgIxFuW6hALVCk9H07AfqrjTES7OspZI3SHk9D5L9Kh/vEVS2oo7Uk+4Z8vpaablGLdGwpbwYF1HyNWdH8aRNyeLoAWH5dSERb66v93ahpNZyW+OpJpxAYzJkqyHTtThBNYHiIpNAMd7iPQHLxK0cjBBX2GGnFsqs19eL6YXHNyPwH0hO1d8TlxnH5wS5vr5hyhVCwvLhQvLVR/Xy7wlRmSuWMu+1XGr2RLVBFXEOMJ9iXUvGXUAGIjEfk5vGZkxgpcKzuGYpV+ubVQGcpOa6ZNeVlJ7DsBQUF2VlDRETrwa5Xq/YrEA58SS2AyVlYt5Paff3GHL9/fqaOGGpVqAlylngkvJVgek2Cmo41Li+bkEqpjizFSPuzq5CUAU6ZHWMBBWC1rmAhIWBJVqtVmmNC1iQlHQzglhLSTagK4VNIZhRmvX6+46V9DXiWFdBV1iajHKtJGoJlLB0KYkB2WmdKN/kaQevICFdlwQB63UNc4K53Yg5T4YsRiB9o/o85FwMKjxySWCpkHKVrta43xYlFpnWuvLBWPClZYRP03VU05d1oxh3qGQgKpBvOnbQiTe3InBO3nz//l1zQibVKzziSeyHJy4BVPJYaKqylK+uS/5GaLe9tK5XlI+r1fVOIAdaKsuK8YEeAufk6vu1wFxd47KtbmpKTtCE9jlcS1DxKHDN1wq+4hMaNVpFNBOY1/U5AmJMPm3/MCcN2wampIM+vCP7BwRJSkpKxgQxI7jJwy2loFuCj08A8fFPyKuIeE4aMuRqFuRWUNnZk4TjWhLk9b+0ILBE50pM4gRGSFB9oIXJxdZMC3kEWE1XF47kH5+v+CtjxllKbkO0stMfV9OEZEpgBMrz83Pn2tGgEbHyRTtrfXEOedwpxQrxGDDAOwd1xIHn++8sJSNfjPdGoJuWHqgvIQXld1oyENOBIcAF9lerCDFxjJS2CLeq5eVWGBA/CX/hrEJQ8fwcR/YqzPvf61mQWxkDU1JdhLZBMuYlOFYEGA44YQxW8B9Wkbh4OfEiGGVtRO/hAN9H4NB3A395TowwO9YRYjJkIe3KF5++17mBL/j87ZCIeQnDOeuwOkfP8oI7oCrD0JeKU/zPSe6A+PDToSO/I0S8lIhzIcUlxMVFF7fqaXb5tkAC5hVRXl6qJT13EFGaFwOVDYiNRzJoQB/DX1jUH16zilf/7gAyEhcR97cXIVPSfteAIcW3TZiXhClNG56LfQswVmIkZR2pMW0SQwk1Ic3j++UVIX7F+X6dqaSO+zB7melbkJdfv37Fpfl6RZgk5uX5pQaFASFWofr9b4U/W6/ohzF8iwaJSIGuYEYc/j2fl5PyqpKclQ9wMqvuAmlI5ISFufoXvn8EvTRd6yIr710pgHCC9kHE9+iOARkRdLy6AsQrnCnF9zkd9EhgSt8+HGqDEFUktuvx8ddjA/RKYSpBXS0rjiQc+dNVbykNLy+vMAzEr8ezlIzGmfhTAAAHA0lEQVR6dn0QNDCmJOQlMjLlFQwX/yLlleL0LpPL8+QcRxUJPxN33nkiP0yA32EmEhC/wOPjOUpqvEjVnkfIqSqQhOQloYUCxK9XF1ccmhOH8yRhvMTDyQRVvtR4ghDi4t8L/LIQEecLcTkdMhooyf69n9YUU0FyECUL2sMkUoiKH72KXqgu5ePlZS7/5CsyXmgVj3elJF9mWpYggfgITVOEvHr9mhGPX6NrLy5wGWFJJefVVUV0cPMsXHztMgcBpYSoIv4t3mnC4+PXM5SUWJEJ6/NltX1RlsY1lU2KgDwWmIz6lZYTQ/kWIwcWQKou1Vhd0ov0HgFe8B9qmwIfzPv1HMi+XXWdNYS8T9KIIT+9pjjWpKwGYQrORqDkkki81vDDFX7yQpjg+NhARMhPO4M0QZVvH3CtBfnaVvRCRkagzZVGanJ4EC9cwBR/G8R4fHEsjcrz/DQPsh6hNEqtUY1U8e0DM+TRp0+fepgXfHdhxFV2YSjXCPWyK/MzWsHj1ypg7ruGNFXVuON6sl2bTxxqqY6FcZfAuTQF1cDihUa/tBR/sZR5yDLyrPOdK2n2aaWKsmGx1RSQR58+DThf49KKm0E65EW+C/4+jg2XKhEhjo52DWkT+0Y9EnV2BJLi09GAU6jJjxfHGeBkNpwgYwWPN32+IySEOV/9zyD9yCLU69gSUUBm+0cCs8+Jzt3A4i+ZQugKaMfAh/f6dSY8thUkRIz/qZLavVJSX6+7+H1IUnPAqSWV9tX34qXXrw0NP0mPHgnE/aP95n8LqVDl2rXRJVKQ+7AcR0aIBJWoG7ptUFWEEhP0gO8NAT9JPgQ8gtn/jyH9sReUkRnyOVHuH2nST6oWUUOnhN0gEZJZ5UXUUZmGJqGI/ytKSj7DsmRaDcmYhp6KE5b+7jWOZty9lgp+0g2FYVGBKCif7wKSLjb9FPfKJDUhx0gtTe9eK14e4dmnO4n3yfwrA3A+pKR7HKC5/mnb1cC0QT8x5pEolsM4Egb91NNQA+5CyadQGpBMKSCB8rnFSZiWotKJXFSUcp96n9kfBM17JmQdCT0fDWhOaMh94nw+WEZ2ns16d4Sj7c4j5QKDbv+5GOcr+eQCpENC0rKMcR7JuyOhrXowUu9If8z0qETcf34wB7KWSkYiPx+fm6xogb80ZwdMyQtEuANFj8w7g3x/xKD77As2Kkcz8RD8PK0jOUzISqGkJyF1sKgDTgtqFE2blBl1kJL5LEjJKnL0YVrZWka1hBQLJQwmZBhDvT+eizojUtyGbObYtTbInlqAtF0tJaVvZYY+BvW5GqRPDcvuoAnp8T2etObCY0MatEZ9HEvUfam2/LTl0b6Sy8lKmkATcrO4D9JQQysq6qYkVNrtP9+KyJCTCs+yMPNxSPsY3rqo6q7Lt0JK26mUJTZtS1Pt5/dgHsD6ZDpByc+bVLQeM4SMiiroumq7kvsa1Gaxq6j82DYpD7yu8ydAPtvU6ZbujtV6PgCZOF3nAuQ9jtULv28+eXTg3OG/OMvPT4e8c1IDq+4r+ThFUzcBIx2ohXl4kQ3Q+0qNBqT7tIvdp19WCyCTdMuSa9QHHZwGVdy1j9Nm31TUxNt/UNz9tou9p19W69mzI9kbsHp2muhRfbw0yltZXvXdTgMNknVdme9PgDzIagNoi5Rmv3acEnsDjkn3qOx81BsHcm4HAbYgE1ISKo+TjhjT6hM83IakCRS++K6n4r2gTy08z5/fxZCSU9z67Nl+k472VgcFSDt6CFkXWQnl/eBeuKdgHQwnD3xwazbFrRBLJ71HyKGu41J6Xtx13me9YLtJS23/z1DA43BKbWUp69ECu923w1XOOi0yPM23d7DLkmPOCzsCkJHPJ0I+u6vS1OjbjSupfTtWfeo69Rs8nUx4dB/m0/OQUA8ODo6gHwCldVpGYnzeJGk9WPT7fTuQsi7cHClLb4MLZdxwKVXLcqCrpZ12B8bkgfGHNL2hE4SW1WZSaZWUVS2rz4hL7RVOuWLdlzMtkpxOTB/XSbPc3O0oNsvG49kW+RxGoLxrAtrFNlIMBnHNY6R3vx3p6EIUTtY/S+aE64jKP+v9Xetk8xgh9pd5IK9BRPtQ9x4FnyQdjbQoqiYsdnQ6Nwu6dPKN2Xh8nsb7eX+TJWHgR7zrv7nsfZYtT3Gv8rL2msoNUjrcg45VEofvGMcL8qviHXEwk/ykPHBLHr+FB42kUVhlyzsLa8LqlsS8y5qcQ1/+nS8Br57ze7m6bHql3qZrGXtu6Hr8sbyCKXqUfyimjbCe6Ofmy03eNMu7/R7VdMjn+0ebzXK5gVjiaAyPjwyjybIlDktx/7RQ/1YsyQYYdwVp4Iob3YP99TQ8+/zMGK1QH/2sPiimrM9siWfy/zwmdgD5/34cjH8f/wcH8m17sJMq7gAAAABJRU5ErkJggg==',
    },
    {
        id: 2,
        name: 'Iphone 14 promax',
        price: 35000000,
        img: 'data:image/png;base64,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',
    },
    {
        id: 3,
        name: 'Samsung',
        price: 30000000,
        img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRyXabSSCPDAWlz4KCAlP5Dpk1LOGyAZ7Af5n53G1qxSrFF5edefwf2lY0hcEUxpPD0-ClovWqElrzx&usqp=CAc'
    }
];

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Index: NextPage = () => {
    const [products, setProducts] = useState(data);
    const dispatch = useDispatch()
    const handlerAddToCart = (product: any) => {
        dispatch(addToCart(product))
    }

    return (
        <>
            <Layout>
                <Grid container spacing={2}>
                    {data.map(product => (
                        <>
                            <Grid xs={3} key={product.id}>
                                <Card sx={{maxWidth: 345}}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.img}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            VND {product.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => handlerAddToCart(product)}>Add To
                                            Car</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </>
                    ))}
                </Grid>
            </Layout>
        </>
    )
}

export default Index