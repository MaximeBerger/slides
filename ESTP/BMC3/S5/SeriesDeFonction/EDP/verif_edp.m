%% Vérification de la solution de l'EDP : 2*df/dx - df/dy = xy
% Script MATLAB utilisant le calcul symbolique
clear; clc;

%% Définition des variables symboliques
syms x y K(t) real

% Définition des termes auxiliaires
u = x + y;      % Premier argument récurrent
v = x + 2*y;    % Second argument récurrent

%% Définition de la fonction f(x,y)
% f(x,y) = -1/75*(x+y)^3 + 3/50*(x+y)^2*(x+2y) + 2/25*(x+y)*(x+2y)^2 + K(x+2y)

f = -1/75 * u^3 + 3/50 * u^2 * v + 2/25 * u * v^2 + K(v);

fprintf('=== Vérification de la solution de l''EDP ===\n\n');
fprintf('EDP : 2 * df/dx - df/dy = xy\n\n');

%% Affichage de f
fprintf('f(x,y) = %s\n\n', char(simplify(f)));

%% Calcul des dérivées partielles
df_dx = diff(f, x);
df_dy = diff(f, y);

fprintf('--- Dérivées partielles ---\n');
fprintf('df/dx = %s\n\n', char(simplify(df_dx)));
fprintf('df/dy = %s\n\n', char(simplify(df_dy)));

%% Calcul du membre de gauche de l'EDP
membre_gauche = 2*df_dx - df_dy;

fprintf('--- Vérification de l''EDP ---\n');
fprintf('2*df/dx - df/dy = %s\n\n', char(simplify(membre_gauche)));

%% Simplification et comparaison avec xy
resultat = simplify(membre_gauche - x*y);

fprintf('--- Résultat ---\n');
if isequal(resultat, sym(0))
    fprintf('✓ VÉRIFIÉ : 2*df/dx - df/dy = xy\n');
    fprintf('  La fonction f est bien solution de l''EDP.\n');
else
    fprintf('Différence (2*df/dx - df/dy) - xy = %s\n', char(resultat));
    if simplify(resultat) == 0
        fprintf('✓ VÉRIFIÉ après simplification : la fonction est solution.\n');
    else
        fprintf('✗ La fonction n''est PAS solution de l''EDP.\n');
    end
end

%% Vérification numérique en quelques points (avec K(t) = 0 pour simplifier)
fprintf('\n--- Vérification numérique (avec K = 0) ---\n');

% Substituer K par la fonction nulle pour le test numérique
f_num = subs(f, K(v), 0);
df_dx_num = diff(f_num, x);
df_dy_num = diff(f_num, y);

% Points de test
points_test = [1, 2; -1, 3; 2, -1; 0.5, 1.5; 3, 4];

fprintf('Point (x,y)\t\t2*df/dx - df/dy\t\txy\t\tÉcart\n');
fprintf('-----------------------------------------------------------\n');

for i = 1:size(points_test, 1)
    x_val = points_test(i, 1);
    y_val = points_test(i, 2);
    
    % Calcul du membre gauche
    mg = double(subs(2*df_dx_num - df_dy_num, [x, y], [x_val, y_val]));
    
    % Membre droit
    md = x_val * y_val;
    
    % Écart
    ecart = abs(mg - md);
    
    fprintf('(%5.2f, %5.2f)\t\t%12.6f\t\t%8.4f\t%.2e\n', x_val, y_val, mg, md, ecart);
end

fprintf('\n=== Fin de la vérification ===\n');
