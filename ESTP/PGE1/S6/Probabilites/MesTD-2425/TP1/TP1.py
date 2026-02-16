import math

# 1. Addition de nombres décimaux
print("1. Addition de nombres décimaux:")
print(f"0.1 + 0.2 = {0.1 + 0.2}")  # Devrait être 0.3
print(f"0.1 + 0.2 == 0.3 ? {0.1 + 0.2 == 0.3}")

# 2. Grands nombres
print("\n2. Grands nombres:")
grand_nombre = 1e16
print(f"1e16 + 1 = {grand_nombre + 1}")
print(f"1e16 + 1 == 1e16 ? {grand_nombre + 1 == grand_nombre}")

# 3. Nombres très proches
print("\n3. Nombres très proches:")
a = 1.0000000000000001
b = 1.0000000000000002
print(f"a = {a}")
print(f"b = {b}")
print(f"a == b ? {a == b}")

# 4. Accumulation d'erreurs
print("\n4. Accumulation d'erreurs:")
somme = 0.0
for i in range(1000000):
    somme += 0.1
print(f"Somme de 0.1 répété 1 million de fois = {somme}")
print(f"Devrait être = {0.1 * 1000000}")

# 5. Représentation binaire
print("\n5. Représentation binaire:")
print(f"0.1 en binaire = {0.1.hex()}")
print(f"0.2 en binaire = {0.2.hex()}")
print(f"0.3 en binaire = {0.3.hex()}")