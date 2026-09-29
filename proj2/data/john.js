// Written by make_website.py. Do not edit by hand.
window.TIERS = window.TIERS || {};
window.TIERS.john = {
 "tier": "john",
 "generated": "2026-09-28 22:40",
 "sets": {
  "images": {
   "label": "Single images",
   "thumb": "original",
   "default_stage": "dog_edges",
   "shortcuts": [
    [
     "Edges",
     "dog_edges"
    ],
    [
     "Orientation",
     "orientation"
    ],
    [
     "Sharpened",
     "sharpen_2"
    ],
    [
     "Laplacian stack",
     "laplacian_0"
    ]
   ],
   "stages": [
    {
     "id": "original",
     "label": "Original",
     "group": "Input",
     "before": null
    },
    {
     "id": "gray",
     "label": "Grayscale",
     "group": "Input",
     "before": "original"
    },
    {
     "id": "box",
     "label": "9 x 9 box filter",
     "group": "1.1 Convolution from scratch",
     "before": "gray"
    },
    {
     "id": "dx",
     "label": "Partial derivative in x",
     "group": "1.2 Finite difference",
     "before": "gray"
    },
    {
     "id": "dy",
     "label": "Partial derivative in y",
     "group": "1.2 Finite difference",
     "before": "gray"
    },
    {
     "id": "fd_magnitude",
     "label": "Gradient magnitude",
     "group": "1.2 Finite difference",
     "before": "gray"
    },
    {
     "id": "fd_edges",
     "label": "Edges",
     "group": "1.2 Finite difference",
     "before": "fd_magnitude"
    },
    {
     "id": "gaussian",
     "label": "Gaussian blur",
     "group": "1.3 Derivative of Gaussian",
     "before": "gray"
    },
    {
     "id": "dog_x",
     "label": "DoG in x",
     "group": "1.3 Derivative of Gaussian",
     "before": "dx"
    },
    {
     "id": "dog_y",
     "label": "DoG in y",
     "group": "1.3 Derivative of Gaussian",
     "before": "dy"
    },
    {
     "id": "dog_magnitude",
     "label": "DoG gradient magnitude",
     "group": "1.3 Derivative of Gaussian",
     "before": "fd_magnitude"
    },
    {
     "id": "dog_edges",
     "label": "DoG edges",
     "group": "1.3 Derivative of Gaussian",
     "before": "fd_edges"
    },
    {
     "id": "orientation",
     "label": "Gradient orientation",
     "group": "1.3 Bells & whistles",
     "before": "dog_magnitude"
    },
    {
     "id": "blurred",
     "label": "Blurred",
     "group": "2.1 Sharpening",
     "before": "original"
    },
    {
     "id": "high",
     "label": "High frequencies",
     "group": "2.1 Sharpening",
     "before": "original"
    },
    {
     "id": "sharpen_1",
     "label": "Sharpened, amount 1",
     "group": "2.1 Sharpening",
     "before": "original"
    },
    {
     "id": "sharpen_2",
     "label": "Sharpened, amount 2",
     "group": "2.1 Sharpening",
     "before": "original"
    },
    {
     "id": "sharpen_4",
     "label": "Sharpened, amount 4",
     "group": "2.1 Sharpening",
     "before": "original"
    },
    {
     "id": "sharpen_8",
     "label": "Sharpened, amount 8",
     "group": "2.1 Sharpening",
     "before": "original"
    },
    {
     "id": "low_pass",
     "label": "Low pass",
     "group": "2.2 Hybrid ingredients",
     "before": "original"
    },
    {
     "id": "high_pass",
     "label": "High pass",
     "group": "2.2 Hybrid ingredients",
     "before": "original"
    },
    {
     "id": "fft",
     "label": "Fourier transform",
     "group": "2.2 Hybrid ingredients",
     "before": "gray"
    },
    {
     "id": "fft_low",
     "label": "Fourier transform of the low pass",
     "group": "2.2 Hybrid ingredients",
     "before": "fft"
    },
    {
     "id": "fft_high",
     "label": "Fourier transform of the high pass",
     "group": "2.2 Hybrid ingredients",
     "before": "fft"
    },
    {
     "id": "gaussian_1",
     "label": "Gaussian level 1",
     "group": "2.3 Gaussian stack",
     "before": "original"
    },
    {
     "id": "gaussian_2",
     "label": "Gaussian level 2",
     "group": "2.3 Gaussian stack",
     "before": "gaussian_1"
    },
    {
     "id": "gaussian_3",
     "label": "Gaussian level 3",
     "group": "2.3 Gaussian stack",
     "before": "gaussian_2"
    },
    {
     "id": "gaussian_4",
     "label": "Gaussian level 4",
     "group": "2.3 Gaussian stack",
     "before": "gaussian_3"
    },
    {
     "id": "laplacian_0",
     "label": "Laplacian level 0",
     "group": "2.3 Laplacian stack",
     "before": "original"
    },
    {
     "id": "laplacian_1",
     "label": "Laplacian level 1",
     "group": "2.3 Laplacian stack",
     "before": "gaussian_1"
    },
    {
     "id": "laplacian_2",
     "label": "Laplacian level 2",
     "group": "2.3 Laplacian stack",
     "before": "gaussian_2"
    },
    {
     "id": "laplacian_3",
     "label": "Laplacian level 3",
     "group": "2.3 Laplacian stack",
     "before": "gaussian_3"
    },
    {
     "id": "laplacian_4",
     "label": "Laplacian level 4",
     "group": "2.3 Laplacian stack",
     "before": "gaussian_4"
    }
   ],
   "items": [
    {
     "name": "cameraman",
     "label": "Cameraman",
     "stages": {
      "original": {
       "file": "lab/images/cameraman/original.jpg",
       "params": [
        [
         "size",
         "540 x 542"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/cameraman/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/cameraman/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "548 x 550"
        ],
        [
         "my convolution",
         "0.572 s"
        ],
        [
         "scipy",
         "0.022 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/cameraman/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/cameraman/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/cameraman/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/cameraman/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "4.2%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/cameraman/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/cameraman/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/cameraman/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/cameraman/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/cameraman/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "5.1%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/cameraman/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/cameraman/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/cameraman/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/cameraman/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/cameraman/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/cameraman/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/cameraman/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/cameraman/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/cameraman/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/cameraman/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/cameraman/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/cameraman/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/cameraman/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/cameraman/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/cameraman/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/cameraman/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/cameraman/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/cameraman/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/cameraman/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/cameraman/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/cameraman/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "me",
     "label": "Me",
     "stages": {
      "original": {
       "file": "lab/images/me/original.jpg",
       "params": [
        [
         "size",
         "600 x 800"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/me/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/me/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "608 x 808"
        ],
        [
         "my convolution",
         "0.884 s"
        ],
        [
         "scipy",
         "0.035 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/me/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/me/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/me/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/me/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "4.8%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/me/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/me/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/me/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/me/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/me/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "4.5%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/me/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/me/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/me/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/me/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/me/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/me/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/me/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/me/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/me/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/me/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/me/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/me/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/me/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/me/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/me/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/me/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/me/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/me/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/me/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/me/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/me/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "taj",
     "label": "Taj Mahal",
     "stages": {
      "original": {
       "file": "lab/images/taj/original.jpg",
       "params": [
        [
         "size",
         "300 x 300"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/taj/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/taj/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "308 x 308"
        ],
        [
         "my convolution",
         "0.235 s"
        ],
        [
         "scipy",
         "0.007 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/taj/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/taj/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/taj/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/taj/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "4.4%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/taj/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/taj/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/taj/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/taj/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/taj/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "4.4%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/taj/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/taj/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/taj/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/taj/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/taj/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/taj/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/taj/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/taj/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/taj/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/taj/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/taj/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/taj/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/taj/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/taj/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/taj/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/taj/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/taj/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/taj/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/taj/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/taj/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/taj/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "my_cat",
     "label": "My cat",
     "stages": {
      "original": {
       "file": "lab/images/my_cat/original.jpg",
       "params": [
        [
         "size",
         "600 x 800"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/my_cat/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/my_cat/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "608 x 808"
        ],
        [
         "my convolution",
         "0.916 s"
        ],
        [
         "scipy",
         "0.034 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/my_cat/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/my_cat/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/my_cat/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/my_cat/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "0.4%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/my_cat/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/my_cat/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/my_cat/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/my_cat/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/my_cat/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "0.8%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/my_cat/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/my_cat/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/my_cat/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/my_cat/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/my_cat/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/my_cat/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/my_cat/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/my_cat/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/my_cat/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/my_cat/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/my_cat/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/my_cat/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/my_cat/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/my_cat/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/my_cat/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/my_cat/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/my_cat/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/my_cat/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/my_cat/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/my_cat/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/my_cat/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "derek",
     "label": "Derek",
     "stages": {
      "original": {
       "file": "lab/images/derek/original.jpg",
       "params": [
        [
         "size",
         "572 x 800"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/derek/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/derek/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "580 x 808"
        ],
        [
         "my convolution",
         "0.863 s"
        ],
        [
         "scipy",
         "0.033 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/derek/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/derek/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/derek/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/derek/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "0.2%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/derek/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/derek/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/derek/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/derek/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/derek/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "0.5%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/derek/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/derek/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/derek/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/derek/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/derek/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/derek/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/derek/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/derek/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/derek/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/derek/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/derek/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/derek/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/derek/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/derek/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/derek/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/derek/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/derek/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/derek/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/derek/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/derek/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/derek/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "nutmeg",
     "label": "Nutmeg",
     "stages": {
      "original": {
       "file": "lab/images/nutmeg/original.jpg",
       "params": [
        [
         "size",
         "800 x 600"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/nutmeg/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/nutmeg/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "808 x 608"
        ],
        [
         "my convolution",
         "0.897 s"
        ],
        [
         "scipy",
         "0.034 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/nutmeg/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/nutmeg/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/nutmeg/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/nutmeg/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "0.6%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/nutmeg/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/nutmeg/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/nutmeg/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/nutmeg/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/nutmeg/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "0.6%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/nutmeg/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/nutmeg/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/nutmeg/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/nutmeg/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/nutmeg/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/nutmeg/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/nutmeg/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/nutmeg/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/nutmeg/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/nutmeg/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/nutmeg/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/nutmeg/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/nutmeg/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/nutmeg/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/nutmeg/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/nutmeg/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/nutmeg/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/nutmeg/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/nutmeg/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/nutmeg/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/nutmeg/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "dario",
     "label": "Dario",
     "stages": {
      "original": {
       "file": "lab/images/dario/original.jpg",
       "params": [
        [
         "size",
         "575 x 625"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/dario/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/dario/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "583 x 633"
        ],
        [
         "my convolution",
         "0.679 s"
        ],
        [
         "scipy",
         "0.026 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/dario/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/dario/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/dario/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/dario/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "1.5%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/dario/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/dario/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/dario/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/dario/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/dario/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "2.1%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/dario/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/dario/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/dario/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/dario/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/dario/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/dario/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/dario/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/dario/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/dario/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/dario/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/dario/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/dario/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/dario/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/dario/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/dario/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/dario/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/dario/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/dario/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/dario/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/dario/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/dario/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "sam",
     "label": "Sam",
     "stages": {
      "original": {
       "file": "lab/images/sam/original.jpg",
       "params": [
        [
         "size",
         "450 x 550"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/sam/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/sam/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "458 x 558"
        ],
        [
         "my convolution",
         "0.500 s"
        ],
        [
         "scipy",
         "0.018 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/sam/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/sam/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/sam/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/sam/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "1.3%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/sam/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/sam/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/sam/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/sam/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/sam/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "1.5%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/sam/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/sam/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/sam/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/sam/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/sam/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/sam/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/sam/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/sam/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/sam/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/sam/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/sam/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/sam/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/sam/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/sam/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/sam/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/sam/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/sam/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/sam/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/sam/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/sam/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/sam/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "oski",
     "label": "Oski",
     "stages": {
      "original": {
       "file": "lab/images/oski/original.jpg",
       "params": [
        [
         "size",
         "599 x 800"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/oski/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/oski/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "607 x 808"
        ],
        [
         "my convolution",
         "0.909 s"
        ],
        [
         "scipy",
         "0.034 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/oski/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/oski/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/oski/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/oski/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "0.3%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/oski/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/oski/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/oski/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/oski/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/oski/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "1.6%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/oski/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/oski/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/oski/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/oski/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/oski/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/oski/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/oski/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/oski/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/oski/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/oski/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/oski/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/oski/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/oski/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/oski/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/oski/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/oski/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/oski/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/oski/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/oski/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/oski/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/oski/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "apple",
     "label": "Apple",
     "stages": {
      "original": {
       "file": "lab/images/apple/original.jpg",
       "params": [
        [
         "size",
         "300 x 300"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/apple/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/apple/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "308 x 308"
        ],
        [
         "my convolution",
         "0.174 s"
        ],
        [
         "scipy",
         "0.007 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/apple/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/apple/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/apple/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/apple/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "0.6%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/apple/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/apple/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/apple/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/apple/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/apple/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "0.4%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/apple/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/apple/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/apple/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/apple/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/apple/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/apple/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/apple/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/apple/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/apple/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/apple/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/apple/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/apple/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/apple/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/apple/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/apple/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/apple/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/apple/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/apple/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/apple/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/apple/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/apple/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "orange",
     "label": "Orange",
     "stages": {
      "original": {
       "file": "lab/images/orange/original.jpg",
       "params": [
        [
         "size",
         "300 x 300"
        ]
       ]
      },
      "gray": {
       "file": "lab/images/orange/gray.jpg",
       "params": []
      },
      "box": {
       "file": "lab/images/orange/box.jpg",
       "params": [
        [
         "kernel",
         "9 x 9"
        ],
        [
         "output",
         "308 x 308"
        ],
        [
         "my convolution",
         "0.173 s"
        ],
        [
         "scipy",
         "0.007 s"
        ]
       ]
      },
      "dx": {
       "file": "lab/images/orange/dx.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1]"
        ]
       ]
      },
      "dy": {
       "file": "lab/images/orange/dy.jpg",
       "params": [
        [
         "filter",
         "[1, 0, -1] as a column"
        ]
       ]
      },
      "fd_magnitude": {
       "file": "lab/images/orange/fd_magnitude.jpg",
       "params": []
      },
      "fd_edges": {
       "file": "lab/images/orange/fd_edges.jpg",
       "params": [
        [
         "threshold",
         0.34
        ],
        [
         "edge pixels",
         "0.0%"
        ]
       ]
      },
      "gaussian": {
       "file": "lab/images/orange/gaussian.jpg",
       "params": [
        [
         "sigma",
         1
        ],
        [
         "kernel",
         "7 x 7"
        ]
       ]
      },
      "dog_x": {
       "file": "lab/images/orange/dog_x.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_y": {
       "file": "lab/images/orange/dog_y.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_magnitude": {
       "file": "lab/images/orange/dog_magnitude.jpg",
       "params": [
        [
         "sigma",
         1
        ]
       ]
      },
      "dog_edges": {
       "file": "lab/images/orange/dog_edges.jpg",
       "params": [
        [
         "threshold",
         0.2
        ],
        [
         "edge pixels",
         "0.2%"
        ]
       ]
      },
      "orientation": {
       "file": "lab/images/orange/orientation.jpg",
       "params": [
        [
         "hue",
         "angle"
        ],
        [
         "brightness",
         "gradient magnitude"
        ]
       ]
      },
      "blurred": {
       "file": "lab/images/orange/blurred.jpg",
       "params": [
        [
         "sigma",
         2
        ]
       ]
      },
      "high": {
       "file": "lab/images/orange/high.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "sharpen_1": {
       "file": "lab/images/orange/sharpen_1.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         1
        ]
       ]
      },
      "sharpen_2": {
       "file": "lab/images/orange/sharpen_2.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         2
        ]
       ]
      },
      "sharpen_4": {
       "file": "lab/images/orange/sharpen_4.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         4
        ]
       ]
      },
      "sharpen_8": {
       "file": "lab/images/orange/sharpen_8.jpg",
       "params": [
        [
         "sigma",
         2
        ],
        [
         "amount",
         8
        ]
       ]
      },
      "low_pass": {
       "file": "lab/images/orange/low_pass.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high_pass": {
       "file": "lab/images/orange/high_pass.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "fft": {
       "file": "lab/images/orange/fft.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/images/orange/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/images/orange/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "gaussian_1": {
       "file": "lab/images/orange/gaussian_1.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 2"
        ]
       ]
      },
      "gaussian_2": {
       "file": "lab/images/orange/gaussian_2.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 4"
        ]
       ]
      },
      "gaussian_3": {
       "file": "lab/images/orange/gaussian_3.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 8"
        ]
       ]
      },
      "gaussian_4": {
       "file": "lab/images/orange/gaussian_4.jpg",
       "params": [
        [
         "blur added at this level",
         "sigma 16"
        ]
       ]
      },
      "laplacian_0": {
       "file": "lab/images/orange/laplacian_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_1": {
       "file": "lab/images/orange/laplacian_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_2": {
       "file": "lab/images/orange/laplacian_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_3": {
       "file": "lab/images/orange/laplacian_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "laplacian_4": {
       "file": "lab/images/orange/laplacian_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    }
   ]
  },
  "hybrids": {
   "label": "Hybrid pairs",
   "thumb": "hybrid",
   "default_stage": "hybrid",
   "shortcuts": [
    [
     "Hybrid",
     "hybrid"
    ],
    [
     "Fourier",
     "fft_hybrid"
    ],
    [
     "Color",
     "color_low"
    ]
   ],
   "stages": [
    {
     "id": "low_input",
     "label": "Low frequency image (aligned)",
     "group": "Inputs",
     "before": null
    },
    {
     "id": "high_input",
     "label": "High frequency image (aligned)",
     "group": "Inputs",
     "before": "low_input"
    },
    {
     "id": "low",
     "label": "Low pass",
     "group": "Filtering",
     "before": "low_input"
    },
    {
     "id": "high",
     "label": "High pass",
     "group": "Filtering",
     "before": "high_input"
    },
    {
     "id": "hybrid",
     "label": "Hybrid",
     "group": "Filtering",
     "before": "low"
    },
    {
     "id": "fft_low_input",
     "label": "Fourier: low frequency image",
     "group": "Fourier transforms",
     "before": null
    },
    {
     "id": "fft_high_input",
     "label": "Fourier: high frequency image",
     "group": "Fourier transforms",
     "before": "fft_low_input"
    },
    {
     "id": "fft_low",
     "label": "Fourier: low pass",
     "group": "Fourier transforms",
     "before": "fft_low_input"
    },
    {
     "id": "fft_high",
     "label": "Fourier: high pass",
     "group": "Fourier transforms",
     "before": "fft_high_input"
    },
    {
     "id": "fft_hybrid",
     "label": "Fourier: hybrid",
     "group": "Fourier transforms",
     "before": "fft_low"
    },
    {
     "id": "both_gray",
     "label": "Both gray",
     "group": "Bells & whistles: color",
     "before": "hybrid"
    },
    {
     "id": "color_low",
     "label": "Color in low frequencies only",
     "group": "Bells & whistles: color",
     "before": "hybrid"
    },
    {
     "id": "color_high",
     "label": "Color in high frequencies only",
     "group": "Bells & whistles: color",
     "before": "hybrid"
    }
   ],
   "items": [
    {
     "name": "derek_nutmeg",
     "label": "Derek + Nutmeg",
     "stages": {
      "low_input": {
       "file": "lab/hybrids/derek_nutmeg/low_input.jpg",
       "params": []
      },
      "high_input": {
       "file": "lab/hybrids/derek_nutmeg/high_input.jpg",
       "params": []
      },
      "low": {
       "file": "lab/hybrids/derek_nutmeg/low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high": {
       "file": "lab/hybrids/derek_nutmeg/high.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "hybrid": {
       "file": "lab/hybrids/derek_nutmeg/hybrid.jpg",
       "params": [
        [
         "low sigma",
         8
        ],
        [
         "high sigma",
         4
        ]
       ]
      },
      "fft_low_input": {
       "file": "lab/hybrids/derek_nutmeg/fft_low_input.jpg",
       "params": []
      },
      "fft_high_input": {
       "file": "lab/hybrids/derek_nutmeg/fft_high_input.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/hybrids/derek_nutmeg/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/hybrids/derek_nutmeg/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "fft_hybrid": {
       "file": "lab/hybrids/derek_nutmeg/fft_hybrid.jpg",
       "params": []
      },
      "both_gray": {
       "file": "lab/hybrids/derek_nutmeg/both_gray.jpg",
       "params": []
      },
      "color_low": {
       "file": "lab/hybrids/derek_nutmeg/color_low.jpg",
       "params": []
      },
      "color_high": {
       "file": "lab/hybrids/derek_nutmeg/color_high.jpg",
       "params": []
      }
     }
    },
    {
     "name": "sam_dario",
     "label": "Sam + Dario",
     "stages": {
      "low_input": {
       "file": "lab/hybrids/sam_dario/low_input.jpg",
       "params": []
      },
      "high_input": {
       "file": "lab/hybrids/sam_dario/high_input.jpg",
       "params": []
      },
      "low": {
       "file": "lab/hybrids/sam_dario/low.jpg",
       "params": [
        [
         "sigma",
         10
        ]
       ]
      },
      "high": {
       "file": "lab/hybrids/sam_dario/high.jpg",
       "params": [
        [
         "sigma",
         6
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "hybrid": {
       "file": "lab/hybrids/sam_dario/hybrid.jpg",
       "params": [
        [
         "low sigma",
         10
        ],
        [
         "high sigma",
         6
        ]
       ]
      },
      "fft_low_input": {
       "file": "lab/hybrids/sam_dario/fft_low_input.jpg",
       "params": []
      },
      "fft_high_input": {
       "file": "lab/hybrids/sam_dario/fft_high_input.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/hybrids/sam_dario/fft_low.jpg",
       "params": [
        [
         "sigma",
         10
        ]
       ]
      },
      "fft_high": {
       "file": "lab/hybrids/sam_dario/fft_high.jpg",
       "params": [
        [
         "sigma",
         6
        ]
       ]
      },
      "fft_hybrid": {
       "file": "lab/hybrids/sam_dario/fft_hybrid.jpg",
       "params": []
      },
      "both_gray": {
       "file": "lab/hybrids/sam_dario/both_gray.jpg",
       "params": []
      },
      "color_low": {
       "file": "lab/hybrids/sam_dario/color_low.jpg",
       "params": []
      },
      "color_high": {
       "file": "lab/hybrids/sam_dario/color_high.jpg",
       "params": []
      }
     }
    },
    {
     "name": "oski_cat",
     "label": "Oski + my cat",
     "stages": {
      "low_input": {
       "file": "lab/hybrids/oski_cat/low_input.jpg",
       "params": []
      },
      "high_input": {
       "file": "lab/hybrids/oski_cat/high_input.jpg",
       "params": []
      },
      "low": {
       "file": "lab/hybrids/oski_cat/low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "high": {
       "file": "lab/hybrids/oski_cat/high.jpg",
       "params": [
        [
         "sigma",
         4
        ],
        [
         "shown",
         "+ 0.5"
        ]
       ]
      },
      "hybrid": {
       "file": "lab/hybrids/oski_cat/hybrid.jpg",
       "params": [
        [
         "low sigma",
         8
        ],
        [
         "high sigma",
         4
        ]
       ]
      },
      "fft_low_input": {
       "file": "lab/hybrids/oski_cat/fft_low_input.jpg",
       "params": []
      },
      "fft_high_input": {
       "file": "lab/hybrids/oski_cat/fft_high_input.jpg",
       "params": []
      },
      "fft_low": {
       "file": "lab/hybrids/oski_cat/fft_low.jpg",
       "params": [
        [
         "sigma",
         8
        ]
       ]
      },
      "fft_high": {
       "file": "lab/hybrids/oski_cat/fft_high.jpg",
       "params": [
        [
         "sigma",
         4
        ]
       ]
      },
      "fft_hybrid": {
       "file": "lab/hybrids/oski_cat/fft_hybrid.jpg",
       "params": []
      },
      "both_gray": {
       "file": "lab/hybrids/oski_cat/both_gray.jpg",
       "params": []
      },
      "color_low": {
       "file": "lab/hybrids/oski_cat/color_low.jpg",
       "params": []
      },
      "color_high": {
       "file": "lab/hybrids/oski_cat/color_high.jpg",
       "params": []
      }
     }
    }
   ]
  },
  "blends": {
   "label": "Blends",
   "thumb": "blend",
   "default_stage": "blend",
   "shortcuts": [
    [
     "Blend",
     "blend"
    ],
    [
     "Levels",
     "blend_level_0"
    ],
    [
     "Grayscale",
     "blend_gray"
    ]
   ],
   "stages": [
    {
     "id": "a",
     "label": "Image A (where the mask is 1)",
     "group": "Inputs",
     "before": null
    },
    {
     "id": "b",
     "label": "Image B (where the mask is 0)",
     "group": "Inputs",
     "before": "a"
    },
    {
     "id": "mask",
     "label": "Mask",
     "group": "Inputs",
     "before": null
    },
    {
     "id": "naive",
     "label": "Cut and paste",
     "group": "Result",
     "before": "mask"
    },
    {
     "id": "blend",
     "label": "Multiresolution blend",
     "group": "Result",
     "before": "naive"
    },
    {
     "id": "blend_gray",
     "label": "Blend in grayscale",
     "group": "Bells & whistles: color",
     "before": "blend"
    },
    {
     "id": "a_level_0",
     "label": "A times mask, level 0",
     "group": "Laplacian levels",
     "before": null
    },
    {
     "id": "b_level_0",
     "label": "B times (1 - mask), level 0",
     "group": "Laplacian levels",
     "before": "a_level_0"
    },
    {
     "id": "blend_level_0",
     "label": "Blended, level 0",
     "group": "Laplacian levels",
     "before": null
    },
    {
     "id": "a_level_1",
     "label": "A times mask, level 1",
     "group": "Laplacian levels",
     "before": null
    },
    {
     "id": "b_level_1",
     "label": "B times (1 - mask), level 1",
     "group": "Laplacian levels",
     "before": "a_level_1"
    },
    {
     "id": "blend_level_1",
     "label": "Blended, level 1",
     "group": "Laplacian levels",
     "before": null
    },
    {
     "id": "a_level_2",
     "label": "A times mask, level 2",
     "group": "Laplacian levels",
     "before": null
    },
    {
     "id": "b_level_2",
     "label": "B times (1 - mask), level 2",
     "group": "Laplacian levels",
     "before": "a_level_2"
    },
    {
     "id": "blend_level_2",
     "label": "Blended, level 2",
     "group": "Laplacian levels",
     "before": null
    },
    {
     "id": "a_level_3",
     "label": "A times mask, level 3",
     "group": "Laplacian levels",
     "before": null
    },
    {
     "id": "b_level_3",
     "label": "B times (1 - mask), level 3",
     "group": "Laplacian levels",
     "before": "a_level_3"
    },
    {
     "id": "blend_level_3",
     "label": "Blended, level 3",
     "group": "Laplacian levels",
     "before": null
    },
    {
     "id": "a_level_4",
     "label": "A times mask, level 4",
     "group": "Laplacian levels",
     "before": null
    },
    {
     "id": "b_level_4",
     "label": "B times (1 - mask), level 4",
     "group": "Laplacian levels",
     "before": "a_level_4"
    },
    {
     "id": "blend_level_4",
     "label": "Blended, level 4",
     "group": "Laplacian levels",
     "before": null
    }
   ],
   "items": [
    {
     "name": "oraple",
     "label": "Oraple",
     "stages": {
      "a": {
       "file": "lab/blends/oraple/a.jpg",
       "params": []
      },
      "b": {
       "file": "lab/blends/oraple/b.jpg",
       "params": []
      },
      "mask": {
       "file": "lab/blends/oraple/mask.jpg",
       "params": []
      },
      "naive": {
       "file": "lab/blends/oraple/naive.jpg",
       "params": []
      },
      "blend": {
       "file": "lab/blends/oraple/blend.jpg",
       "params": [
        [
         "levels",
         5
        ],
        [
         "first sigma",
         2
        ]
       ]
      },
      "blend_gray": {
       "file": "lab/blends/oraple/blend_gray.jpg",
       "params": []
      },
      "a_level_0": {
       "file": "lab/blends/oraple/a_level_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_0": {
       "file": "lab/blends/oraple/b_level_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_0": {
       "file": "lab/blends/oraple/blend_level_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_1": {
       "file": "lab/blends/oraple/a_level_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_1": {
       "file": "lab/blends/oraple/b_level_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_1": {
       "file": "lab/blends/oraple/blend_level_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_2": {
       "file": "lab/blends/oraple/a_level_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_2": {
       "file": "lab/blends/oraple/b_level_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_2": {
       "file": "lab/blends/oraple/blend_level_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_3": {
       "file": "lab/blends/oraple/a_level_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_3": {
       "file": "lab/blends/oraple/b_level_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_3": {
       "file": "lab/blends/oraple/blend_level_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_4": {
       "file": "lab/blends/oraple/a_level_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      },
      "b_level_4": {
       "file": "lab/blends/oraple/b_level_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      },
      "blend_level_4": {
       "file": "lab/blends/oraple/blend_level_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "sam_dario",
     "label": "Sam / Dario",
     "stages": {
      "a": {
       "file": "lab/blends/sam_dario/a.jpg",
       "params": []
      },
      "b": {
       "file": "lab/blends/sam_dario/b.jpg",
       "params": []
      },
      "mask": {
       "file": "lab/blends/sam_dario/mask.jpg",
       "params": []
      },
      "naive": {
       "file": "lab/blends/sam_dario/naive.jpg",
       "params": []
      },
      "blend": {
       "file": "lab/blends/sam_dario/blend.jpg",
       "params": [
        [
         "levels",
         5
        ],
        [
         "first sigma",
         2
        ]
       ]
      },
      "blend_gray": {
       "file": "lab/blends/sam_dario/blend_gray.jpg",
       "params": []
      },
      "a_level_0": {
       "file": "lab/blends/sam_dario/a_level_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_0": {
       "file": "lab/blends/sam_dario/b_level_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_0": {
       "file": "lab/blends/sam_dario/blend_level_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_1": {
       "file": "lab/blends/sam_dario/a_level_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_1": {
       "file": "lab/blends/sam_dario/b_level_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_1": {
       "file": "lab/blends/sam_dario/blend_level_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_2": {
       "file": "lab/blends/sam_dario/a_level_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_2": {
       "file": "lab/blends/sam_dario/b_level_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_2": {
       "file": "lab/blends/sam_dario/blend_level_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_3": {
       "file": "lab/blends/sam_dario/a_level_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_3": {
       "file": "lab/blends/sam_dario/b_level_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_3": {
       "file": "lab/blends/sam_dario/blend_level_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_4": {
       "file": "lab/blends/sam_dario/a_level_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      },
      "b_level_4": {
       "file": "lab/blends/sam_dario/b_level_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      },
      "blend_level_4": {
       "file": "lab/blends/sam_dario/blend_level_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    },
    {
     "name": "lecun_hinton",
     "label": "LeCun / Hinton",
     "stages": {
      "a": {
       "file": "lab/blends/lecun_hinton/a.jpg",
       "params": []
      },
      "b": {
       "file": "lab/blends/lecun_hinton/b.jpg",
       "params": []
      },
      "mask": {
       "file": "lab/blends/lecun_hinton/mask.jpg",
       "params": []
      },
      "naive": {
       "file": "lab/blends/lecun_hinton/naive.jpg",
       "params": []
      },
      "blend": {
       "file": "lab/blends/lecun_hinton/blend.jpg",
       "params": [
        [
         "levels",
         5
        ],
        [
         "first sigma",
         2
        ]
       ]
      },
      "blend_gray": {
       "file": "lab/blends/lecun_hinton/blend_gray.jpg",
       "params": []
      },
      "a_level_0": {
       "file": "lab/blends/lecun_hinton/a_level_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_0": {
       "file": "lab/blends/lecun_hinton/b_level_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_0": {
       "file": "lab/blends/lecun_hinton/blend_level_0.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_1": {
       "file": "lab/blends/lecun_hinton/a_level_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_1": {
       "file": "lab/blends/lecun_hinton/b_level_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_1": {
       "file": "lab/blends/lecun_hinton/blend_level_1.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_2": {
       "file": "lab/blends/lecun_hinton/a_level_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_2": {
       "file": "lab/blends/lecun_hinton/b_level_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_2": {
       "file": "lab/blends/lecun_hinton/blend_level_2.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_3": {
       "file": "lab/blends/lecun_hinton/a_level_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "b_level_3": {
       "file": "lab/blends/lecun_hinton/b_level_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "blend_level_3": {
       "file": "lab/blends/lecun_hinton/blend_level_3.jpg",
       "params": [
        [
         "shown",
         "0 is middle gray"
        ]
       ]
      },
      "a_level_4": {
       "file": "lab/blends/lecun_hinton/a_level_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      },
      "b_level_4": {
       "file": "lab/blends/lecun_hinton/b_level_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      },
      "blend_level_4": {
       "file": "lab/blends/lecun_hinton/blend_level_4.jpg",
       "params": [
        [
         "shown",
         "as is, the last level has nothing negative"
        ]
       ]
      }
     }
    }
   ]
  }
 }
};
