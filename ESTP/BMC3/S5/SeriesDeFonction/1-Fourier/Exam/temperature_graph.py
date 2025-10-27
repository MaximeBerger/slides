import numpy as np
import matplotlib.pyplot as plt
from matplotlib import rcParams

# Configuration pour le français
rcParams['font.family'] = 'serif'
rcParams['font.serif'] = ['Times New Roman']
rcParams['axes.unicode_minus'] = False

# Définition de la fonction de température
def T(t):
    """
    Fonction de température périodique
    T(t) = 20 + 5*cos(πt/12) + 2*sin(πt/6) + 0.5*cos(πt/4)
    """
    return (20 + 
            5 * np.cos(np.pi * t / 12) + 
            2 * np.sin(np.pi * t / 6) + 
            0.5 * np.cos(np.pi * t / 4))

# Création de l'axe temporel (0 à 48 heures pour voir 2 périodes)
t = np.linspace(0, 48, 1000)

# Calcul des valeurs de température
temperature = T(t)

# Création du graphique
plt.figure(figsize=(12, 6))
plt.plot(t, temperature, 'b-', linewidth=2, label='T(t)')
plt.xlabel('Temps (heures)', fontsize=12)
plt.ylabel('Température (°C)', fontsize=12)
plt.title('Signal de température périodique dans un bâtiment', fontsize=14, fontweight='bold')
plt.grid(True, alpha=0.3)
plt.legend(fontsize=11)

# Ajout de marqueurs pour les points importants
plt.axhline(y=20, color='r', linestyle='--', alpha=0.7, label='Température moyenne (20°C)')
plt.axvline(x=24, color='g', linestyle=':', alpha=0.7, label='Période (24h)')
plt.axvline(x=48, color='g', linestyle=':', alpha=0.7, label='Fin (48h)')

# Annotations pour les composantes
plt.annotate('Composante continue: 20°C', xy=(12, 20), xytext=(15, 25),
             arrowprops=dict(arrowstyle='->', color='red', alpha=0.7),
             fontsize=10, color='red')

plt.annotate('Amplitude max: 27.5°C', xy=(0, 27.5), xytext=(5, 30),
             arrowprops=dict(arrowstyle='->', color='blue', alpha=0.7),
             fontsize=10, color='blue')

plt.annotate('Amplitude min: 12.5°C', xy=(12, 12.5), xytext=(15, 10),
             arrowprops=dict(arrowstyle='->', color='blue', alpha=0.7),
             fontsize=10, color='blue')


# Ajustement de l'espacement
plt.tight_layout()

# Sauvegarde du graphique
plt.savefig('temperature_signal.png', dpi=300, bbox_inches='tight')
plt.savefig('temperature_signal.pdf', bbox_inches='tight')

# Affichage du graphique
plt.show()

# Affichage des informations sur le signal
print("=== ANALYSE DU SIGNAL DE TEMPÉRATURE ===")
print(f"Période du signal: 24 heures (affichage sur 48h = 2 périodes)")
print(f"Température moyenne: 20°C")
print(f"Amplitude maximale: {np.max(temperature):.1f}°C")
print(f"Amplitude minimale: {np.min(temperature):.1f}°C")
print(f"Variation totale: {np.max(temperature) - np.min(temperature):.1f}°C")

print("\n=== COMPOSANTES HARMONIQUES ===")
print("1. Composante continue: 20°C")
print("2. Premier harmonique: 5cos(pi*t/12) - periode 24h")
print("3. Deuxieme harmonique: 2sin(pi*t/6) - periode 12h") 
print("4. Troisieme harmonique: 0.5cos(pi*t/4) - periode 8h")

# Calcul des coefficients de Fourier
print("\n=== COEFFICIENTS DE FOURIER COMPLEXES ===")
print("c0 = 20 (composante continue)")
print("c1 = 2.5, c-1 = 2.5 (pour f = 1/24 Hz)")
print("c2 = -i, c-2 = i (pour f = 1/12 Hz)")
print("c3 = 0.25, c-3 = 0.25 (pour f = 1/8 Hz)")
print("cn = 0 pour tous les autres n")
