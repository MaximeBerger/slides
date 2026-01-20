%% Résolution de l'EDP : 2*df/dx - df/dy = xy
% Par la méthode des caractéristiques
clear; clc;

fprintf('=== Résolution de l''EDP : 2*df/dx - df/dy = xy ===\n\n');

%% Variables symboliques
syms x y f(x,y) g(t) C1 real

%% Méthode des caractéristiques
% EDP : a*df/dx + b*df/dy = c
% Ici : a = 2, b = -1, c = xy

fprintf('--- Méthode des caractéristiques ---\n\n');
fprintf('Équations caractéristiques : dx/2 = dy/(-1) = df/(xy)\n\n');

%% Étape 1 : Première caractéristique
% dx/2 = dy/(-1)  =>  -dx = 2*dy  =>  x + 2y = C1
fprintf('1) De dx/2 = dy/(-1) :\n');
fprintf('   -dx = 2*dy\n');
fprintf('   Intégration : x + 2y = C1 (constante)\n\n');

%% Étape 2 : Intégration le long de la caractéristique
% Sur la caractéristique, x = C1 - 2y
% dy/(-1) = df/(xy) = df/((C1 - 2y)*y)
% df = -(C1 - 2y)*y * dy = (-C1*y + 2*y^2) dy

fprintf('2) Sur la caractéristique x = C1 - 2y :\n');
fprintf('   dy/(-1) = df/((C1 - 2y)*y)\n');
fprintf('   df = -(C1 - 2y)*y * dy = (-C1*y + 2*y^2) dy\n\n');

% Intégration symbolique
syms Y
integrand = -C1*Y + 2*Y^2;
F_integral = int(integrand, Y);
fprintf('   Intégration : f = %s + g(C1)\n', char(F_integral));
fprintf('   f = -C1*y^2/2 + 2*y^3/3 + g(C1)\n\n');

%% Étape 3 : Substitution de C1 = x + 2y
fprintf('3) Substitution de C1 = x + 2y :\n');

% Solution symbolique
f_sol = -(x + 2*y)*y^2/2 + 2*y^3/3 + g(x + 2*y);
f_sol_simplified = simplify(expand(f_sol));

fprintf('   f(x,y) = -(x+2y)*y^2/2 + 2*y^3/3 + g(x+2y)\n');
fprintf('   f(x,y) = -x*y^2/2 - y^3 + 2*y^3/3 + g(x+2y)\n');
fprintf('   f(x,y) = -x*y^2/2 - y^3/3 + g(x+2y)\n\n');

%% Solution finale
fprintf('=== SOLUTION GÉNÉRALE ===\n\n');
fprintf('   f(x,y) = -y^2/2 * x - y^3/3 + g(x + 2y)\n\n');
fprintf('Où g est une fonction arbitraire de classe C^1.\n\n');

% Forme factorisée
fprintf('Forme factorisée :\n');
fprintf('   f(x,y) = -y^2*(3x + 2y)/6 + g(x + 2y)\n\n');

%% Vérification symbolique
fprintf('=== VÉRIFICATION ===\n\n');

syms g(t)
f_verif = -x*y^2/2 - y^3/3 + g(x + 2*y);

df_dx = diff(f_verif, x);
df_dy = diff(f_verif, y);

fprintf('df/dx = %s\n', char(simplify(df_dx)));
fprintf('df/dy = %s\n\n', char(simplify(df_dy)));

LHS = simplify(2*df_dx - df_dy);
fprintf('2*df/dx - df/dy = %s\n\n', char(LHS));

if isequal(simplify(LHS - x*y), sym(0))
    fprintf('✓ VÉRIFIÉ : 2*df/dx - df/dy = xy\n\n');
else
    fprintf('Résultat : %s\n', char(simplify(LHS - x*y)));
end

%% Comparaison avec la solution donnée dans le cours
fprintf('=== COMPARAISON AVEC LA SOLUTION DU COURS ===\n\n');

syms K(t)
f_cours = -1/75*(x+y)^3 + 3/50*(x+y)^2*(x+2*y) + 2/25*(x+y)*(x+2*y)^2 + K(x+2*y);

df_cours_dx = diff(f_cours, x);
df_cours_dy = diff(f_cours, y);

LHS_cours = simplify(2*df_cours_dx - df_cours_dy);
fprintf('Pour la solution du cours :\n');
fprintf('2*df/dx - df/dy = %s\n\n', char(simplify(LHS_cours)));

diff_cours = simplify(LHS_cours - x*y);
if isequal(diff_cours, sym(0))
    fprintf('✓ La solution du cours est CORRECTE.\n');
else
    fprintf('✗ La solution du cours donne une différence de : %s\n', char(diff_cours));
    fprintf('  La solution du cours semble INCORRECTE.\n');
end

%% Affichage LaTeX
fprintf('\n=== SOLUTION EN LATEX ===\n\n');
fprintf('f(x, y) = -\\frac{y^2}{2} x - \\frac{y^3}{3} + g(x + 2y)\n\n');
fprintf('ou de manière équivalente :\n\n');
fprintf('f(x, y) = -\\frac{y^2(3x + 2y)}{6} + g(x + 2y)\n\n');

%% Test numérique de la solution correcte
fprintf('=== TEST NUMÉRIQUE (avec g = 0) ===\n\n');

f_num = @(x,y) -x.*y.^2/2 - y.^3/3;
df_dx_num = @(x,y) -y.^2/2;
df_dy_num = @(x,y) -x.*y - y.^2;

test_points = [1, 2; -1, 3; 2, -1; 0.5, 1.5; 3, 4];

fprintf('Point (x,y)\t\t2*df/dx - df/dy\t\txy\t\tÉcart\n');
fprintf('-----------------------------------------------------------\n');

for i = 1:size(test_points, 1)
    xv = test_points(i, 1);
    yv = test_points(i, 2);
    
    LHS_val = 2*df_dx_num(xv, yv) - df_dy_num(xv, yv);
    RHS_val = xv * yv;
    ecart = abs(LHS_val - RHS_val);
    
    fprintf('(%5.2f, %5.2f)\t\t%12.6f\t\t%8.4f\t%.2e\n', xv, yv, LHS_val, RHS_val, ecart);
end

fprintf('\n=== Fin ===\n');
