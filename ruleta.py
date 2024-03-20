#ruleta rusa

import random

for i in range(6):
    print("Presiona Enter para girar la ruleta")
    input()
    x = random.randint(1, 6)
    print("La bala está en la recámara", x)
    if x == 1:
        print("¡BANG!")
        break
    else:
        print("Click")
