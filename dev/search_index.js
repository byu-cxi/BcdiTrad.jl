var documenterSearchIndex = {"docs":
[{"location":"#BcdiTrad.jl-Documentation","page":"BcdiTrad","title":"BcdiTrad.jl Documentation","text":"","category":"section"},{"location":"#About","page":"BcdiTrad","title":"About","text":"","category":"section"},{"location":"","page":"BcdiTrad","title":"BcdiTrad","text":"Bragg Coherent Diffraction Imaging (BCDI) Trad (Traditional) implements projection-based phase retrieval algorithms.","category":"page"},{"location":"","page":"BcdiTrad","title":"BcdiTrad","text":"While this package is marked as BCDI specific, the methods are more general and can be used in many phase retrieval problems. In the future, this package may be incorporated into a more general phase retrieval core package.","category":"page"},{"location":"","page":"BcdiTrad","title":"BcdiTrad","text":"Currently, this entire package must be run with access to GPUs. This may change in the future (especially if Issues requesting it are opened), but for our research group, using GPUs is a necessity.","category":"page"},{"location":"#Installation","page":"BcdiTrad","title":"Installation","text":"","category":"section"},{"location":"","page":"BcdiTrad","title":"BcdiTrad","text":"BcdiTrad.jl is registered in the Julia general registry and can be installed by running in the REPL package manager (]):","category":"page"},{"location":"","page":"BcdiTrad","title":"BcdiTrad","text":"add BcdiTrad","category":"page"},{"location":"use/#Overview","page":"Usage","title":"Overview","text":"","category":"section"},{"location":"use/","page":"Usage","title":"Usage","text":"Similar to pynx and others?, BcdiTrad implements projection-based algorithms in operator-style format. This means that the multiplication (*) and power (^) operators are used to apply operators to some current state. This may look like the following:","category":"page"},{"location":"use/","page":"Usage","title":"Usage","text":"er = BcdiTrad.ER()\nhio = BcdiTrad.HIO(0.9)\nstate = BcdiTrad.State(intensities, trues(size(intensities)))\n\n(er * hio^20)^5 * state","category":"page"},{"location":"use/","page":"Usage","title":"Usage","text":"This short script applies 20 HIO iterations and one ER iterations for a total of 5 times. This makes it easy to implement very complex recipes for phase retrieval algorithms.","category":"page"},{"location":"use/#API","page":"Usage","title":"API","text":"","category":"section"},{"location":"use/","page":"Usage","title":"Usage","text":"BcdiTrad.State\nBcdiTrad.ER\nBcdiTrad.HIO\nBcdiTrad.Shrink\nBcdiTrad.Center","category":"page"},{"location":"use/#BcdiTrad.State","page":"Usage","title":"BcdiTrad.State","text":"State(intensities, recSupport)\nState(intensities, recSupport, support)\n\nCreate a reconstruction object. The intensities is one fully measured diffraction peak and recSupport is a mask over the intensities that remove those intenities from the reconstruction process.\n\nThe initialization process shifts the peak to be centered in the Fourier sense (i.e. the center of mass of the peak is moved to the edge of the image, or the zero frequency). If the support is not passed in, an initial guess of the support  is created by taking an IFFT of the intensities and including everything above 0.1 times the maximum value.\n\n\n\n\n\n","category":"type"},{"location":"use/#BcdiTrad.ER","page":"Usage","title":"BcdiTrad.ER","text":"ER()\n\nCreate an object that applies one iteration of Error Reduction (ER). ER is an iterative projection algorithm that enforces two constraints, (1) the modulus constraint and (2) the support constraint:\n\nWhen moved to reciprocal space, the reconstructed object must match the diffraction pattern.\nThe reconstructed object must fully lie within the support.\n\nOne iteration of ER first applies the modulus constraint, then the support constraint to the object, then returnns.\n\nGradient descent is an alternate way to view the ER algorithm becausee ER is equivalent to gradient descent with a step size of 0.5.\n\nMore information about the ER algorithm can be found here:\n\nPages = []\nCanonical = false\n\nFienup1978\nMarchesini2007\n\n\n\n\n\n","category":"type"},{"location":"use/#BcdiTrad.HIO","page":"Usage","title":"BcdiTrad.HIO","text":"HIO(beta)\n\nCreate an object that applies an iteration of hybrid input-output (HIO). On the interior of the support, HIO is equivalent to applying the modulus constraint as described in the ER algorithm, and on the exterior  of the support, HIO is equal to the current reconstruction minus a  fraction of the output after applying the modulus constraint, that is,\n\nrho_i+1 = begincases\nER(rho_i)  rho in support\nrho_i - beta ER(rho_i)  rho \notin support\nendcases\n\nMarchesini [1] has shown that the HIO algorithm is equivalent to a mini-max problem.\n\nMore information about the HIO algorithm can be found here:\n\nPages = []\nCanonical = false\n\nFienup1978\nMarchesini2007\n\n\n\n\n\n","category":"type"},{"location":"use/#BcdiTrad.Shrink","page":"Usage","title":"BcdiTrad.Shrink","text":"Shrink(threshold, sigma, state::State)\n\nCreate an object that applies one iteration of the shrinkwrap algorithm. Shrinkwrap first applies a Gaussian blur to the current reconstruction using sigma as the width of the Gaussian. The support is then created from everything above the threshold times maximum value of the blurred object.\n\nFurther information about the shrinkwrap algorithm can be found here:\n\nPages = [] \nCanonical = false\n\nMarchesini2003a\n\n\n\n\n\n","category":"type"},{"location":"use/#BcdiTrad.Center","page":"Usage","title":"BcdiTrad.Center","text":"Center(state)\n\nCreate an object that centers the current state. The center of mass of the support is calculated and the object is moved so the center of mass is centered in the Fourier transform sense. In other words, the center of mass is moved to the zeroth frequency, or the bottom left corner of the image. \n\n\n\n\n\n","category":"type"}]
}
