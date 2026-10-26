/* ==========================================================================
   BPG ACADEMY — APPLICATION ENGINE (script.js)
   Faculty: Bishnu Prasad Gautam (BPG Sir) | Motherland Sec. School, Pokhara
   ========================================================================== */

let isAuthenticated = false;
let pendingTargetView = null;

/* --------------------------------------------------------------------------
   DEEP CURRICULUM DATABASE (CLASS 11 & CLASS 12 SYNCHRONIZED)
   -------------------------------------------------------------------------- */
const PORTAL_DATA = {
    'class-11': {
        gradeTitle: 'Class 11 NEB Mathematics (Subject Code: Mat. 101)',
        syllabusRows: [
            { code: 'Unit 01', name: 'Sets, Real Numbers & Mathematical Logic', hours: '18 hrs', marks: '8 Marks', focus: 'Truth tables, De Morgan laws, Absolute value inequalities' },
            { code: 'Unit 02', name: 'Algebra (Functions, Complex Numbers, Quadratics, Matrices)', hours: '38 hrs', marks: '18 Marks', focus: 'Bijective functions, Cube roots of unity, Cramer’s rule' },
            { code: 'Unit 03', name: 'Trigonometry (Inverse Circular & Properties of Triangle)', hours: '20 hrs', marks: '10 Marks', focus: 'Inverse tangent identities, Sine/Cosine/Projection laws' },
            { code: 'Unit 04', name: 'Analytical Geometry (Pair of Lines & Circle)', hours: '28 hrs', marks: '14 Marks', focus: 'Homogeneous 2nd degree equations, Tangent to a circle' },
            { code: 'Unit 05', name: 'Calculus (Limits, Continuity, Derivatives & Applications)', hours: '46 hrs', marks: '20 Marks', focus: 'First-principle derivatives, Indeterminate limits, Maxima/Minima' },
            { code: 'Unit 06', name: 'Vectors, Statistics & Probability (Applied Module)', hours: '10 hrs', marks: '5 Marks', focus: 'Scalar product, Skewness & Bayes conditional probability' }
        ],
        units: [
            {
                code: 'UNIT 01',
                title: 'Sets, Real Numbers & Mathematical Logic',
                topics: [
                    {
                        id: 'c11-u1-t1',
                        title: '1.1 Mathematical Logic, Statements & Truth Tables',
                        readTime: '12 min read',
                        badge: 'High-Yield',
                        overview: `Mathematical logic forms the deductive foundation of all higher proofs in Class 11 NEB Mathematics. A proposition (or statement) is a declarative sentence that is either unambiguously true ($T$) or false ($F$), but never both simultaneously. Using logical connectives—conjunction ($\\land$), disjunction ($\\lor$), negation ($\\sim$), conditional ($\\implies$), and biconditional ($\\iff$)—we construct compound statements and verify tautologies and contradictions.`,
                        definitions: `$$p \\implies q \\equiv \\sim p \\lor q \\quad \\text{(Material Implication Identity)}$$
                        $$\\sim(p \\implies q) \\equiv p \\land \\sim q \\quad \\text{(Negation of Conditional)}$$
                        $$\\text{Contrapositive of } (p \\implies q) \\text{ is } (\\sim q \\implies \\sim p)$$`,
                        derivation: `To prove that $(p \\implies q) \\iff (\\sim q \\implies \\sim p)$ is a tautology, we evaluate all four truth combinations of $(p, q) \\in \\{(T,T), (T,F), (F,T), (F,F)\\}$. Notice that $p \\implies q$ is false ONLY when $p$ is True and $q$ is False. In that exact row, $\\sim q$ is True and $\\sim p$ is False, making $\\sim q \\implies \\sim p$ False as well. Hence both columns are identical across every valuation, establishing logical equivalence.`,
                        example: `**NEB Board Question (4 Marks):** Construct the truth table to prove that $[(p \\implies q) \\land p] \\implies q$ (Modus Ponens) is a tautology.\n\n**Solution Outline:** Create columns for $p$, $q$, $p \\implies q$, $(p \\implies q) \\land p$, and finally the implication to $q$. In all 4 rows, the final column evaluates exclusively to $T$.`,
                        pitfalls: `Students frequently write $\\sim(p \\implies q) \\equiv \\sim p \\implies \\sim q$. Remember: an implication is NOT negated by negating its parts! Always convert $p \\implies q$ to $\\sim p \\lor q$ first, then apply De Morgan's Law.`
                    },
                    {
                        id: 'c11-u1-t2',
                        title: '1.2 Absolute Value & Real Number Inequalities',
                        readTime: '10 min read',
                        badge: 'Core Proof',
                        overview: `The real number continuum $\\mathbb{R}$ is equipped with an order structure and the absolute value metric $|x|$, measuring distance from the origin. Mastering interval notation, neighborhood intervals $(a-\\delta, a+\\delta)$, and the Triangle Inequality is essential before studying $\\epsilon$-$\\delta$ limits in Calculus.`,
                        definitions: `$$|x| = \\begin{cases} x, & x \\ge 0 \\\\ -x, & x < 0 \\end{cases}, \\qquad |x - a| < r \\iff a - r < x < a + r$$
                        $$\\text{Triangle Inequality: } |x + y| \\le |x| + |y| \\quad \\text{and} \\quad |x - y| \\ge ||x| - |y||$$`,
                        derivation: `Since $-|x| \\le x \\le |x|$ and $-|y| \\le y \\le |y|$, adding the two double-inequalities yields $-(|x| + |y|) \\le x + y \\le (|x| + |y|)$. By the fundamental modulus property $|u| \\le k \\iff -k \\le u \\le k$, we immediately obtain $|x + y| \\le |x| + |y|$.`,
                        example: `**Worked Example:** Solve $|2x - 5| \\le 9$ and express the solution set on the real line.\n\n**Steps:** $-9 \\le 2x - 5 \\le 9 \\implies -4 \\le 2x \\le 14 \\implies -2 \\le x \\le 7$, so $x \\in [-2, 7]$.`,
                        pitfalls: `Never square both sides of an inequality unless both sides are guaranteed non-negative, and never divide by a variable expression $(x-a)$ without splitting into $x > a$ and $x < a$ cases.`
                    }
                ]
            },
            {
                code: 'UNIT 02',
                title: 'Algebra: Functions, Complex Numbers & Quadratics',
                topics: [
                    {
                        id: 'c11-u2-t1',
                        title: '2.1 Complex Numbers & Cube Roots of Unity (ω)',
                        readTime: '15 min read',
                        badge: '5-Mark Guaranteed',
                        overview: `Extending the real number system with the imaginary unit $i = \\sqrt{-1}$ yields the algebraically closed field $\\mathbb{C} = \\{a + ib : a, b \\in \\mathbb{R}\\}$. The solutions of $z^3 = 1$ lie symmetrically on the unit circle in the Argand plane and satisfy powerful cyclic algebraic identities heavily tested in NEB examinations.`,
                        definitions: `$$\\omega = \\frac{-1 + i\\sqrt{3}}{2}, \\qquad \\omega^2 = \\frac{-1 - i\\sqrt{3}}{2}$$
                        $$1 + \\omega + \\omega^2 = 0 \\quad \\text{and} \\quad \\omega^3 = 1$$`,
                        derivation: `Starting from $z^3 - 1 = 0$, factor as $(z - 1)(z^2 + z + 1) = 0$. The real root is $z = 1$, while the quadratic formula on $z^2 + z + 1 = 0$ gives $z = \\frac{-1 \\pm \\sqrt{1 - 4}}{2} = \\frac{-1 \\pm i\\sqrt{3}}{2}$. Squaring $\\omega$ directly verifies $\\omega^2 = \\frac{1 - 2i\\sqrt{3} - 3}{4} = \\frac{-1 - i\\sqrt{3}}{2}$, and summing $1 + \\omega + \\omega^2$ cancels the imaginary parts to zero.`,
                        example: `**NEB Board Problem:** Prove that $(1 - \\omega + \\omega^2)^4 + (1 + \\omega - \\omega^2)^4 = -16$.\n\n**Method:** Replace $1 + \\omega^2 = -\\omega$ in the first term to get $(-2\\omega)^4 = 16\\omega^4 = 16\\omega$, and replace $1 + \\omega = -\\omega^2$ in the second to get $(-2\\omega^2)^4 = 16\\omega^8 = 16\\omega^2$. Sum: $16(\\omega + \\omega^2) = 16(-1) = -16$.`,
                        pitfalls: `Do not expand high powers of $(1 + \\omega - \\omega^2)^n$ binomially! Always use $1 + \\omega + \\omega^2 = 0$ to collapse three terms into a single monomial before raising to power $n$.`
                    },
                    {
                        id: 'c11-u2-t2',
                        title: '2.2 Quadratic Equations: Symmetric Roots & Common Roots',
                        readTime: '11 min read',
                        badge: 'Board Core',
                        overview: `For a quadratic equation $ax^2 + bx + c = 0$ ($a \\neq 0$), Vieta's formulas connect the roots $\\alpha, \\beta$ directly to the coefficients. We can determine the nature of roots via the discriminant $\\Delta = b^2 - 4ac$ and construct new quadratic equations whose roots are symmetric functions of $\\alpha$ and $\\beta$.`,
                        definitions: `$$\\alpha + \\beta = -\\frac{b}{a}, \\qquad \\alpha\\beta = \\frac{c}{a}, \\qquad |\\alpha - \\beta| = \\frac{\\sqrt{b^2 - 4ac}}{|a|}$$
                        $$\\text{Condition for One Common Root of } a_1x^2+b_1x+c_1=0 \\text{ and } a_2x^2+b_2x+c_2=0:$$
                        $$(b_1c_2 - b_2c_1)(a_1b_2 - a_2b_1) = (c_1a_2 - c_2a_1)^2$$`,
                        derivation: `Let $\\alpha$ be the common root. Then $a_1\\alpha^2 + b_1\\alpha + c_1 = 0$ and $a_2\\alpha^2 + b_2\\alpha + c_2 = 0$. By the rule of cross-multiplication, $\\frac{\\alpha^2}{b_1c_2 - b_2c_1} = \\frac{\\alpha}{c_1a_2 - c_2a_1} = \\frac{1}{a_1b_2 - a_2b_1}$. Eliminating $\\alpha$ gives the required condition.`,
                        example: `**Worked Example:** Find the value of $k$ so that $x^2 + kx + 12 = 0$ and $x^2 + 7x + 12 = 0$ have a common root.`,
                        pitfalls: `When a problem states "both roots are common", use the simpler proportionality ratio $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$ instead of the single-root cross-multiplication formula.`
                    }
                ]
            },
            {
                code: 'UNIT 03',
                title: 'Trigonometry: Inverse Circular Functions & Triangles',
                topics: [
                    {
                        id: 'c11-u3-t1',
                        title: '3.1 Inverse Circular Functions & Principal Value Branches',
                        readTime: '11 min read',
                        badge: 'Important',
                        overview: `Trigonometric functions are periodic and therefore not one-to-one on $\\mathbb{R}$. By restricting their domains to principal value branches—such as $[-\\pi/2, \\pi/2]$ for $\\sin^{-1}x$ and $[0, \\pi]$ for $\\cos^{-1}x$—we obtain bijective inverse functions with rich algebraic addition formulas.`,
                        definitions: `$$\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}, \\quad x \\in [-1, 1]$$
                        $$\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\left(\\frac{x + y}{1 - xy}\\right), \\quad xy < 1$$`,
                        derivation: `Let $\\tan^{-1}x = A$ and $\\tan^{-1}y = B$ so that $\\tan A = x$ and $\\tan B = y$. Using the compound angle identity $\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A\\tan B} = \\frac{x + y}{1 - xy}$, taking $\\tan^{-1}$ on both sides yields the identity.`,
                        example: `**Board Question:** Prove that $\\tan^{-1}\\left(\\frac{1}{2}\\right) + \\tan^{-1}\\left(\\frac{1}{3}\\right) = \\frac{\\pi}{4}$.`,
                        pitfalls: `Do not confuse $\\sin^{-1}x$ (inverse sine angle) with $(\\sin x)^{-1} = \\csc x$ (reciprocal of sine).`
                    }
                ]
            },
            {
                code: 'UNIT 04',
                title: 'Analytical Geometry: Pair of Straight Lines & Circles',
                topics: [
                    {
                        id: 'c11-u4-t1',
                        title: '4.1 Homogeneous Second-Degree Equations & Pair of Lines',
                        readTime: '14 min read',
                        badge: '5-Mark Long Qn',
                        overview: `Every homogeneous equation of the second degree $ax^2 + 2hxy + by^2 = 0$ represents a pair of straight lines passing through the origin $(0,0)$. The angle $\\theta$ between them and the equations of their angle bisectors are classic 5-mark NEB derivations.`,
                        definitions: `$$\\tan\\theta = \\pm \\frac{2\\sqrt{h^2 - ab}}{a + b}, \\qquad \\text{Angle Bisectors: } \\frac{x^2 - y^2}{a - b} = \\frac{xy}{h}$$
                        $$\\text{Coincident if } h^2 = ab, \\qquad \\text{Perpendicular if } a + b = 0$$`,
                        derivation: `Divide $ax^2 + 2hxy + by^2 = 0$ by $x^2$ to obtain $b(y/x)^2 + 2h(y/x) + a = 0$, a quadratic in slope $m = y/x$. If the lines have slopes $m_1, m_2$, then $m_1 + m_2 = -2h/b$ and $m_1m_2 = a/b$. Substituting into $\\tan\\theta = \\left|\\frac{m_1 - m_2}{1 + m_1m_2}\\right| = \\frac{\\sqrt{(m_1+m_2)^2 - 4m_1m_2}}{|1 + m_1m_2|}$ gives $\\tan\\theta = \\frac{2\\sqrt{h^2 - ab}}{|a + b|}$.`,
                        example: `**NEB Board Problem:** Find the acute angle between the lines represented by $x^2 - 5xy + 6y^2 = 0$ and find the equation of their bisectors.`,
                        pitfalls: `When testing whether a general second-degree equation $ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0$ represents a pair of lines, remember to verify $\\Delta = abc + 2fgh - af^2 - bg^2 - ch^2 = 0$ carefully with half-coefficients $h, g, f$.`
                    }
                ]
            },
            {
                code: 'UNIT 05',
                title: 'Calculus: Limits, Continuity & First-Principle Derivatives',
                topics: [
                    {
                        id: 'c11-u5-t1',
                        title: '5.1 Trigonometric & Exponential Indeterminate Limits',
                        readTime: '14 min read',
                        badge: 'High Weightage',
                        overview: `Limits evaluate the limiting behavior of $f(x)$ as $x$ approaches $a$. When direct substitution produces indeterminate forms such as $0/0$ or $\\infty/\\infty$, we apply geometric sandwich theorems, rationalization, and standard trigonometric/logarithmic limit theorems.`,
                        definitions: `$$\\lim_{\\theta \\to 0} \\frac{\\sin\\theta}{\\theta} = 1 \\quad (\\theta \\text{ in radians}), \\qquad \\lim_{x \\to a} \\frac{x^n - a^n}{x - a} = na^{n-1}$$
                        $$\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1, \\qquad \\lim_{x \\to 0} \\frac{\\ln(1 + x)}{x} = 1$$`,
                        derivation: `Consider a unit circle sector with acute central angle $\\theta$ in radians. Comparing the areas of $\\triangle OAB$, circular sector $OAB$, and right $\\triangle OAT$ gives $\\frac{1}{2}r^2\\sin\\theta < \\frac{1}{2}r^2\\theta < \\frac{1}{2}r^2\\tan\\theta$. Dividing by $\\frac{1}{2}r^2\\sin\\theta > 0$ and taking reciprocals yields $\\cos\\theta < \\frac{\\sin\\theta}{\\theta} < 1$. As $\\theta \\to 0$, $\\cos\\theta \\to 1$, so by the Sandwich Theorem, $\\lim_{\\theta \\to 0}\\frac{\\sin\\theta}{\\theta} = 1$.`,
                        example: `**NEB Board Question:** Evaluate $\\lim_{x \\to 0} \\frac{e^{\\sin x} - 1}{x}$.\n\n**Solution:** Multiply and divide by $\\sin x$: $\\lim_{x \\to 0} \\left(\\frac{e^{\\sin x} - 1}{\\sin x}\\right) \\cdot \\left(\\frac{\\sin x}{x}\\right) = 1 \\times 1 = 1$.`,
                        pitfalls: `The theorem $\\lim_{\\theta \\to 0}\\frac{\\sin\\theta}{\\theta} = 1$ holds ONLY when $\\theta$ is measured in radians! If an problem specifies $x^\\circ$, first convert $x^\\circ = \\frac{\\pi x}{180}$ radians.`
                    },
                    {
                        id: 'c11-u5-t2',
                        title: '5.2 Derivatives from First Principle (Ab-Initio Method)',
                        readTime: '16 min read',
                        badge: 'Mandatory 5-Mark',
                        overview: `The derivative $f'(x) = \\frac{dy}{dx}$ represents the instantaneous rate of change of $y = f(x)$ and the slope of the tangent line at $(x, f(x))$. Every NEB Class 11 board examination includes a mandatory question requiring differentiation from first principles.`,
                        definitions: `$$f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$
                        $$\\frac{d}{dx}(\\sin x) = \\cos x, \\qquad \\frac{d}{dx}(\\sqrt{x}) = \\frac{1}{2\\sqrt{x}}, \\qquad \\frac{d}{dx}(\\ln x) = \\frac{1}{x}$$`,
                        derivation: `Let $f(x) = \\sqrt{\\sin x}$. Then $f(x+h) = \\sqrt{\\sin(x+h)}$. By definition:\n$$f'(x) = \\lim_{h \\to 0} \\frac{\\sqrt{\\sin(x+h)} - \\sqrt{\\sin x}}{h}$$\nRationalizing the numerator gives:\n$$\\lim_{h \\to 0} \\frac{\\sin(x+h) - \\sin x}{h(\\sqrt{\\sin(x+h)} + \\sqrt{\\sin x})} = \\lim_{h \\to 0} \\frac{2\\cos(x + h/2)\\sin(h/2)}{2(h/2)(\\sqrt{\\sin(x+h)} + \\sqrt{\\sin x})} = \\frac{\\cos x}{2\\sqrt{\\sin x}}.$$`,
                        example: `**Practice Derivation:** Find from first principles the derivative of $\\ln(\\sec x)$ and $e^{\\sqrt{x}}$.`,
                        pitfalls: `Never apply L'Hôpital's rule when a question explicitly says "Find from first principles / definition"! Doing so results in zero marks in NEB board evaluation.`
                    }
                ]
            }
        ],
        plans: [
            {
                tier: 'free',
                badge: 'Free Community',
                name: 'Class 11 Self-Study Pack',
                price: 'Rs. 0',
                period: 'Free Forever',
                features: [
                    'Complete Class 11 NEB Syllabus & Weightage Grid',
                    'Access to Unit 01 – Unit 05 Deep Reading Chapters',
                    'Free Sample Formula Sheets (PDF)',
                    'Public Academic Announcements & Exam Alerts'
                ],
                cta: 'Current Active Plan'
            },
            {
                tier: 'gold',
                badge: 'Gold Distinction',
                name: 'Class 11 NEB Board Mastery',
                price: 'Rs. 2,999',
                period: 'Full Academic Year',
                features: [
                    'Daily Morning Live Zoom Classes with BPG Sir (6:30 AM)',
                    'Full HD Recorded Lecture Vault with Unlimited Replays',
                    'All 5 Units Handwritten Notes & Solved Exercise PDFs',
                    'BPG Sir’s Red-Pen Common Mistake Workbook',
                    'Weekly 75-Marks Saturday Board Mock Tests'
                ],
                cta: 'Enroll in Gold Batch'
            },
            {
                tier: 'diamond',
                badge: 'Diamond Ranker',
                name: 'Class 11 Board + Pre-IOE Foundation',
                price: 'Rs. 4,499',
                period: 'Board + Entrance Track',
                features: [
                    'Everything in Gold Distinction Batch Included',
                    '1-on-1 Direct WhatsApp Doubt Mentorship with BPG Sir',
                    'Early IOE Pulchowk & CEE MCQ Speed Foundation',
                    'Evaluated Answer Sheet Grading with Personal Feedback',
                    'Diamond Exclusive Past 10-Year Solved Question Bank'
                ],
                cta: 'Join Diamond Ranker'
            }
        ],
        notes: [
            { title: 'Class 11 Complete Formula & Identity Masterbook', unit: 'All 5 Units', pages: '42 Pages', type: 'Free Sample', badgeClass: 'free' },
            { title: 'First-Principle Calculus 25 Solved Board Derivations', unit: 'Unit 05: Calculus', pages: '36 Pages', type: 'Free Sample', badgeClass: 'free' },
            { title: 'BPG Sir Handwritten Notes: Complex Numbers & Quadratics', unit: 'Unit 02: Algebra', pages: '64 Pages', type: 'Paid / Diamond Exclusive', badgeClass: 'paid' },
            { title: 'Analytical Geometry: Pair of Lines & Circle Red-Pen Guide', unit: 'Unit 04: Geometry', pages: '48 Pages', type: 'Paid / Diamond Exclusive', badgeClass: 'paid' },
            { title: 'NEB Grade 11 Past Board Solved Papers (2076 – 2082)', unit: 'Board Archive', pages: '90 Pages', type: 'Paid / Diamond Exclusive', badgeClass: 'paid' },
            { title: 'Trigonometric Equations & Properties of Triangle Workbook', unit: 'Unit 03: Trig', pages: '38 Pages', type: 'Free Sample', badgeClass: 'free' }
        ]
    },

    /* ==========================================================================
       CLASS 12 SYNCHRONIZED HUB DATA
       ========================================================================== */
    'class-12': {
        gradeTitle: 'Class 12 NEB Mathematics (Subject Code: Mat. 102)',
        syllabusRows: [
            { code: 'Unit 01', name: 'Permutations, Combinations & Mathematical Induction', hours: '16 hrs', marks: '9 Marks', focus: 'Circular permutations, Principle of induction, Counting proofs' },
            { code: 'Unit 02', name: 'Binomial Theorem, Exponential & Logarithmic Series', hours: '14 hrs', marks: '8 Marks', focus: 'General & middle terms, Binomial coefficient identities, e & ln series' },
            { code: 'Unit 03', name: 'Complex Numbers (De Moivre) & Matrices / System of Equations', hours: '22 hrs', marks: '11 Marks', focus: 'De Moivre’s theorem, nth roots, Gauss-Jordan & Row-equivalent inverse' },
            { code: 'Unit 04', name: 'Trigonometry & Properties / Solutions of Triangles', hours: '12 hrs', marks: '6 Marks', focus: 'Half-angle tangent laws, Ambiguous cases, Inverse trig proofs' },
            { code: 'Unit 05', name: 'Analytical Geometry: Conic Sections (Parabola, Ellipse, Hyperbola)', hours: '22 hrs', marks: '11 Marks', focus: 'Eccentricity, Focus-directrix, Tangents & normals to conics' },
            { code: 'Unit 06', name: 'Advanced Differential & Integral Calculus + Differential Equations', hours: '48 hrs', marks: '22 Marks', focus: 'L’Hôpital, Tangents, Standard Integrals, Area bounded, 1st order ODEs' },
            { code: 'Unit 07', name: '3D Coordinates, Planes & Vector Cross Products', hours: '16 hrs', marks: '8 Marks', focus: 'Direction cosines, Plane normal form, Vector cross product area/torque' }
        ],
        units: [
            {
                code: 'UNIT 01',
                title: 'Permutations, Combinations & Mathematical Induction',
                topics: [
                    {
                        id: 'c12-u1-t1',
                        title: '1.1 Fundamental Counting, Restricted & Circular Permutations',
                        readTime: '13 min read',
                        badge: 'Board Staple',
                        overview: `Combinatorics in Class 12 deals with systematic arrangement (permutation) and selection (combination) of discrete objects. When objects are arranged around a closed circle rather than a linear row, rotational symmetry reduces the count from $n!$ to $(n-1)!$.`,
                        definitions: `$$P(n, r) = \\frac{n!}{(n - r)!}, \\qquad C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}$$
                        $$\\text{Circular Permutations: } (n - 1)! \\quad \\text{(Garland/Necklace: } \\frac{1}{2}(n - 1)!\\text{)}$$
                        $$\\text{Pascal’s Identity: } \\binom{n}{r} + \\binom{n}{r-1} = \\binom{n+1}{r}$$`,
                        derivation: `To prove Pascal's Identity algebraically:\n$$\\binom{n}{r} + \\binom{n}{r-1} = \\frac{n!}{r!(n-r)!} + \\frac{n!}{(r-1)!(n-r+1)!} = \\frac{n!}{(r-1)!(n-r)!}\\left[\\frac{1}{r} + \\frac{1}{n-r+1}\\right] = \\frac{n!(n+1)}{r!(n+1-r)!} = \\binom{n+1}{r}.$$`,
                        example: `**NEB Board Question:** In how many ways can 8 examination papers be arranged so that the best and worst papers never come together?\n\n**Solution:** Total ways $= 8! = 40,320$. Ways together (bundle as 1 unit) $= 7! \\times 2! = 10,080$. Never together $= 40,320 - 10,080 = 30,240$.`,
                        pitfalls: `To find "never together" when there are more than 2 restricted items (e.g., 3 boys never together), DO NOT subtract bundled ways from total! Instead, use the Gap Method: seat the remaining items first and place the restricted items in the gaps.`
                    }
                ]
            },
            {
                code: 'UNIT 02',
                title: 'Binomial Theorem, Exponential & Logarithmic Series',
                topics: [
                    {
                        id: 'c12-u2-t1',
                        title: '2.1 Binomial Expansion, General Term & Coefficient Identities',
                        readTime: '14 min read',
                        badge: '5-Mark Core',
                        overview: `Newton's Binomial Theorem expands $(a + x)^n$ into $n+1$ terms for any positive integer $n$. Finding the term independent of $x$, the middle term(s), and proving sum-of-squares identities of binomial coefficients $C_0^2 + C_1^2 + \\dots + C_n^2 = \\frac{(2n)!}{(n!)^2}$ are cornerstone Class 12 questions.`,
                        definitions: `$$(a + x)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} x^r, \\qquad T_{r+1} = \\binom{n}{r} a^{n-r} x^r$$
                        $$C_0 + C_1 + C_2 + \\dots + C_n = 2^n, \\qquad C_0^2 + C_1^2 + \\dots + C_n^2 = \\binom{2n}{n} = \\frac{(2n)!}{(n!)^2}$$`,
                        derivation: `Write $(1 + x)^n = C_0 + C_1x + C_2x^2 + \\dots + C_nx^n$ and $(x + 1)^n = C_0x^n + C_1x^{n-1} + \\dots + C_n$. Multiplying the two expansions gives $(1+x)^{2n}$. Equating the coefficient of $x^n$ on both sides yields $C_0^2 + C_1^2 + \\dots + C_n^2 = \\binom{2n}{n}$.`,
                        example: `**NEB Board Problem:** Find the term independent of $x$ in the expansion of $\\left(\\frac{3}{2}x^2 - \\frac{1}{3x}\\right)^9$.`,
                        pitfalls: `Remember that the $(r+1)^{\\text{th}}$ term uses index $r$, not $r+1$! Also preserve the negative sign $(-1)^r$ when the binomial has a minus sign.`
                    }
                ]
            },
            {
                code: 'UNIT 03',
                title: 'Complex Numbers (De Moivre) & Matrices',
                topics: [
                    {
                        id: 'c12-u3-t1',
                        title: '3.1 De Moivre’s Theorem & nth Roots of a Complex Number',
                        readTime: '15 min read',
                        badge: 'Must Know',
                        overview: `De Moivre's Theorem bridges polar trigonometry and complex exponentiation. It allows effortless computation of powers $z^n$ and extracts all $n$ distinct roots of $z^{1/n}$ spaced by $\\frac{2k\\pi}{n}$ radians around a circle in the complex plane.`,
                        definitions: `$$(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta), \\quad n \\in \\mathbb{Q}$$
                        $$z^{1/n} = r^{1/n}\\left[\\cos\\left(\\frac{\\theta + 2k\\pi}{n}\\right) + i\\sin\\left(\\frac{\\theta + 2k\\pi}{n}\\right)\\right], \\quad k = 0, 1, \\dots, n-1$$`,
                        derivation: `By Mathematical Induction for $n \\in \\mathbb{N}$: Base case $n=1$ is trivial. Assuming true for $n=k$, multiply by $(\\cos\\theta + i\\sin\\theta)$ and apply compound angle formulas $\\cos(k\\theta)\\cos\\theta - \\sin(k\\theta)\\sin\\theta = \\cos((k+1)\\theta)$ and $\\sin(k\\theta)\\cos\\theta + \\cos(k\\theta)\\sin\\theta = \\sin((k+1)\\theta)$.`,
                        example: `**Board Question:** Use De Moivre's theorem to find the cube roots of $-1 + i\\sqrt{3}$.`,
                        pitfalls: `De Moivre's Theorem applies ONLY when $\\cos\\theta$ is the real part and $\\sin\\theta$ is the imaginary part with the SAME angle $\\theta$. If given $\\sin\\theta + i\\cos\\theta$, first rewrite as $\\cos(\\pi/2 - \\theta) + i\\sin(\\pi/2 - \\theta)$.`
                    }
                ]
            },
            {
                code: 'UNIT 04',
                title: 'Trigonometry & Properties of Triangles',
                topics: [
                    {
                        id: 'c12-u4-t1',
                        title: '4.1 Half-Angle Formulas, Napier’s Analogy & Triangle Area',
                        readTime: '11 min read',
                        badge: 'Core Proof',
                        overview: `In any $\\triangle ABC$ with semi-perimeter $s = \\frac{a+b+c}{2}$, the half-angles $\\sin(A/2), \\cos(A/2), \\tan(A/2)$ and Heron's area formula $\\Delta$ allow complete geometric resolution of oblique triangles.`,
                        definitions: `$$\\sin\\frac{A}{2} = \\sqrt{\\frac{(s-b)(s-c)}{bc}}, \\qquad \\cos\\frac{A}{2} = \\sqrt{\\frac{s(s-a)}{bc}}$$
                        $$\\text{Napier’s Analogy: } \\tan\\left(\\frac{B - C}{2}\\right) = \\frac{b - c}{b + c}\\cot\\frac{A}{2}$$`,
                        derivation: `Using Cosine Law $\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}$ and $1 - \\cos A = 2\\sin^2(A/2)$, factor $a^2 - (b-c)^2 = (a-b+c)(a+b-c) = 4(s-b)(s-c)$ to obtain $\\sin(A/2)$.`,
                        example: `**NEB Board Question:** In any $\\triangle ABC$, prove that $\\frac{\\cos A}{a} + \\frac{\\cos B}{b} + \\frac{\\cos C}{c} = \\frac{a^2 + b^2 + c^2}{2abc}$.`,
                        pitfalls: `Keep track of cyclic symmetry $(a \\to b \\to c)$ to verify algebraic expansions rapidly during exams.`
                    }
                ]
            },
            {
                code: 'UNIT 05',
                title: 'Analytical Geometry: Conic Sections (Parabola, Ellipse, Hyperbola)',
                topics: [
                    {
                        id: 'c12-u5-t1',
                        title: '5.1 Standard Conics, Eccentricity & Tangent Equations',
                        readTime: '16 min read',
                        badge: 'High Weightage',
                        overview: `A conic section is the locus of a point $P(x,y)$ whose distance from a fixed point (Focus $S$) bears a constant ratio $e$ (eccentricity) to its perpendicular distance from a fixed straight line (Directrix $ZM$): $SP = e \\cdot PM$.`,
                        definitions: `$$\\text{Parabola } (e = 1): y^2 = 4ax, \\quad \\text{Focus } (a,0), \\quad \\text{L.R.} = 4a$$
                        $$\\text{Ellipse } (e < 1): \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, \\quad b^2 = a^2(1 - e^2), \\quad \\text{Foci } (\\pm ae, 0), \\quad \\text{L.R.} = \\frac{2b^2}{a}$$
                        $$\\text{Hyperbola } (e > 1): \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1, \\quad b^2 = a^2(e^2 - 1)$$`,
                        derivation: `For the ellipse, let $S(ae, 0)$ and directrix $x = a/e$. Then $SP^2 = e^2 PM^2 \\implies (x - ae)^2 + y^2 = e^2(x - a/e)^2 = (ex - a)^2$. Simplifying gives $x^2(1 - e^2) + y^2 = a^2(1 - e^2)$. Dividing by $a^2(1 - e^2)$ and setting $b^2 = a^2(1 - e^2)$ yields $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$.`,
                        example: `**NEB Board Problem:** Find the center, eccentricity, foci, and length of latus rectum of the ellipse $9x^2 + 16y^2 - 18x + 64y - 71 = 0$.`,
                        pitfalls: `Always check whether $a^2 > b^2$ (horizontal major axis) or $b^2 > a^2$ (vertical major axis) before writing the foci coordinates and eccentricity formula!`
                    }
                ]
            },
            {
                code: 'UNIT 06',
                title: 'Advanced Differential & Integral Calculus',
                topics: [
                    {
                        id: 'c12-u6-t1',
                        title: '6.1 Standard Quadratic & Trigonometric Integrals + Differential Equations',
                        readTime: '18 min read',
                        badge: '22 Marks Total',
                        overview: `Class 12 Calculus culminates in anti-derivatives of rational/irrational quadratic forms, definite integrals for area bounded by curves, and first-order differential equations (variable separable, homogeneous, and linear integrating factor methods).`,
                        definitions: `$$\\int \\frac{dx}{x^2 - a^2} = \\frac{1}{2a}\\ln\\left|\\frac{x - a}{x + a}\\right| + C, \\qquad \\int \\sqrt{a^2 - x^2}\\,dx = \\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a} + C$$
                        $$\\text{Linear ODE: } \\frac{dy}{dx} + P(x)y = Q(x) \\implies y \\cdot (\\text{I.F.}) = \\int Q(x) \\cdot (\\text{I.F.})\\,dx + C, \\quad \\text{I.F.} = e^{\\int P(x)\\,dx}$$`,
                        derivation: `To derive $\\int \\frac{dx}{x^2 - a^2}$, decompose into partial fractions: $\\frac{1}{x^2 - a^2} = \\frac{1}{2a}\\left(\\frac{1}{x - a} - \\frac{1}{x + a}\\right)$. Integrating term-by-term gives $\\frac{1}{2a}(\\ln|x-a| - \\ln|x+a|) + C = \\frac{1}{2a}\\ln\\left|\\frac{x-a}{x+a}\\right| + C$.`,
                        example: `**NEB 5-Mark Question:** Solve the differential equation $\\cos^2x \\frac{dy}{dx} + y = \\tan x$.\n\n**Steps:** Divide by $\\cos^2x$ to get $\\frac{dy}{dx} + (\\sec^2x)y = \\tan x \\sec^2x$. Here $\\text{I.F.} = e^{\\int \\sec^2x\\,dx} = e^{\\tan x}$. Put $\\tan x = t$ and integrate by parts.`,
                        pitfalls: `When solving $\\int \\frac{dx}{a + b\\cos x}$, always use the half-angle substitution $\\cos x = \\frac{1 - \\tan^2(x/2)}{1 + \\tan^2(x/2)}$ and put $t = \\tan(x/2)$ so $dx = \\frac{2\\,dt}{1 + t^2}$.`
                    }
                ]
            },
            {
                code: 'UNIT 07',
                title: '3D Coordinates, Planes & Vector Cross Products',
                topics: [
                    {
                        id: 'c12-u7-t1',
                        title: '7.1 Direction Cosines, Planes & Vector Cross Product',
                        readTime: '13 min read',
                        badge: 'Scoring Unit',
                        overview: `Three-dimensional analytical geometry and vector algebra unify spatial lines, planes, and cross products $\\vec{a} \\times \\vec{b}$. Understanding direction cosines $(l, m, n)$ and the normal vector to a plane $Ax + By + Cz + D = 0$ makes 3D geometry one of the fastest-scoring units in the board exam.`,
                        definitions: `$$l^2 + m^2 + n^2 = \\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1, \\qquad \\cos\\theta = l_1l_2 + m_1m_2 + n_1n_2$$
                        $$\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}, \\qquad \\text{Area of } \\triangle = \\frac{1}{2}|\\vec{a} \\times \\vec{b}|$$`,
                        derivation: `If $P(x,y,z)$ has position vector $\\vec{r}$ with magnitude $r = \\sqrt{x^2+y^2+z^2}$, then $x = lr, y = mr, z = nr$. Squaring and adding gives $(l^2+m^2+n^2)r^2 = x^2+y^2+z^2 = r^2 \\implies l^2+m^2+n^2 = 1$.`,
                        example: `**NEB Board Problem:** Find the equation of the plane passing through $(2, -3, 1)$ and perpendicular to the line joining $(3, 4, -1)$ and $(2, -1, 5)$.`,
                        pitfalls: `Remember that direction ratios $(a, b, c)$ do NOT satisfy $a^2 + b^2 + c^2 = 1$; you must divide by $\\sqrt{a^2 + b^2 + c^2}$ to convert direction ratios into unit direction cosines $(l, m, n)$.`
                    }
                ]
            }
        ],
        plans: [
            {
                tier: 'free',
                badge: 'Free Community',
                name: 'Class 12 Self-Study Vault',
                price: 'Rs. 0',
                period: 'Free Forever',
                features: [
                    'Complete Class 12 NEB Syllabus & Weightage Grid',
                    'Access to All 7 Units Deep Reading Chapters',
                    'Free Sample Integration & Conic Formula Sheets (PDF)',
                    'Public Academic Announcements & Exam Notices'
                ],
                cta: 'Current Active Plan'
            },
            {
                tier: 'gold',
                badge: 'Gold Distinction',
                name: 'Class 12 NEB Board Mastery',
                price: 'Rs. 3,499',
                period: 'Full Academic Year',
                features: [
                    'Daily Evening Live Zoom Classes with BPG Sir (5:00 PM)',
                    '22-Marks Calculus Intensive Derivation Workshop',
                    'Complete Handwritten Notes & Solved Exercise PDFs',
                    'BPG Sir’s Red-Pen Common Mistake Workbook',
                    'Weekly 75-Marks Board Mock Tests'
                ],
                cta: 'Enroll in Gold Batch'
            },
            {
                tier: 'diamond',
                badge: 'Diamond Ranker',
                name: 'Class 12 Board + IOE Rank Booster',
                price: 'Rs. 4,999',
                period: 'Board + Entrance Track',
                features: [
                    'Everything in Gold Distinction Batch Included',
                    '1-on-1 Direct WhatsApp Doubt Mentorship with BPG Sir',
                    'Parallel IOE Pulchowk & CEE 10-Second Speed Shortcuts',
                    'Evaluated Answer Sheet Grading with Personal Feedback',
                    'Diamond Exclusive Past 15-Year Solved Board & IOE Archive'
                ],
                cta: 'Join Diamond Ranker'
            }
        ],
        notes: [
            { title: 'Class 12 Master Integration & Differential Equations Handbook', unit: 'Unit 06: Calculus', pages: '58 Pages', type: 'Free Sample', badgeClass: 'free' },
            { title: 'Conic Sections (Parabola, Ellipse, Hyperbola) Formula Matrix', unit: 'Unit 05: Conics', pages: '34 Pages', type: 'Free Sample', badgeClass: 'free' },
            { title: 'BPG Sir Handwritten Notes: Permutations, Binomial & Complex', unit: 'Units 01 – 03', pages: '76 Pages', type: 'Paid / Diamond Exclusive', badgeClass: 'paid' },
            { title: '3D Coordinates, Planes & Vector Cross Products Complete Guide', unit: 'Unit 07: 3D & Vectors', pages: '44 Pages', type: 'Paid / Diamond Exclusive', badgeClass: 'paid' },
            { title: 'NEB Grade 12 Past Board Solved Papers (2076 – 2082)', unit: 'Board Archive', pages: '104 Pages', type: 'Paid / Diamond Exclusive', badgeClass: 'paid' },
            { title: 'Red-Pen Common Pitfalls in Class 12 Board Examinations', unit: 'Exam Special', pages: '28 Pages', type: 'Free Sample', badgeClass: 'free' }
        ]
    }
};

/* --------------------------------------------------------------------------
   1. AUTH GUARD & SPA VIEW ROUTER
   -------------------------------------------------------------------------- */
function navigateTo(viewId) {
    document.getElementById('classesDropdownMenu')?.classList.remove('open');

    // Auth Guard: Guests can only view 'about'
    if (viewId !== 'about' && !isAuthenticated) {
        pendingTargetView = viewId;
        showToast('Please sign in to access class portals');
        openAuthModal();
        return;
    }

    document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewId);
    });
    if (['class-11', 'class-12', 'after-12'].includes(viewId)) {
        document.getElementById('classesDropdownBtn')?.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchClassTab(classId, tabKey, btnEl) {
    const parentView = document.getElementById(`view-${classId}`);
    if (!parentView) return;

    parentView.querySelectorAll('.class-tab-pill').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    parentView.querySelectorAll('.class-tab-pane').forEach(p => p.classList.remove('active'));
    const targetPane = document.getElementById(`pane-${classId}-${tabKey}`);
    if (targetPane) targetPane.classList.add('active');
}

function toggleClassesDropdown(e) {
    e.stopPropagation();
    document.getElementById('classesDropdownMenu')?.classList.toggle('open');
}

/* --------------------------------------------------------------------------
   2. RENDER SYLLABUS, DEEP READING ENGINE, PLANS & NOTES
   -------------------------------------------------------------------------- */
function renderAllPortals() {
    ['class-11', 'class-12'].forEach(classKey => {
        const data = PORTAL_DATA[classKey];

        // 1. Render Syllabus Table
        const sylContainer = document.getElementById(`syllabusContainer-${classKey}`);
        if (sylContainer) {
            sylContainer.innerHTML = `
                <div class="syllabus-card-wrap">
                    <div class="syllabus-head-bar">
                        <div>
                            <span class="pathway-badge">Official NEB Specification Grid</span>
                            <h3 style="font-size:1.35rem; margin-top:4px;">${data.gradeTitle}</h3>
                        </div>
                        <button class="btn-hero-outline" onclick="switchClassTab('${classKey}', 'units', document.getElementById('tab-${classKey === 'class-11' ? 'c11' : 'c12'}-units'))">
                            <i class="fa-solid fa-book-open-reader"></i> Launch Deep Reading Units
                        </button>
                    </div>
                    <div style="overflow-x:auto;">
                        <table class="syllabus-table">
                            <thead>
                                <tr>
                                    <th>Unit</th>
                                    <th>Curriculum Domain</th>
                                    <th>Teaching Hours</th>
                                    <th>Board Weightage</th>
                                    <th>High-Yield Exam Focus</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.syllabusRows.map(r => `
                                    <tr>
                                        <td><strong style="color:var(--accent-navy);">${r.code}</strong></td>
                                        <td><strong>${r.name}</strong></td>
                                        <td>${r.hours}</td>
                                        <td><span class="pathway-badge amber">${r.marks}</span></td>
                                        <td>${r.focus}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        // 2. Render Deep Reading Engine Sidebar & Initial Subtopic
        renderUnitsTree(classKey, '');
        const firstTopic = data.units[0]?.topics[0];
        if (firstTopic) {
            selectDeepSubtopic(classKey, data.units[0].code, data.units[0].title, firstTopic.id);
        }

        // 3. Render 3-Tier Premium Plans
        const plansContainer = document.getElementById(`plansContainer-${classKey}`);
        if (plansContainer) {
            plansContainer.innerHTML = `
                <div class="courses-tier-grid-3">
                    ${data.plans.map(p => `
                        <div class="tier-card ${p.tier}">
                            <span class="tier-badge ${p.tier}">${p.badge}</span>
                            <h3 style="font-size:1.28rem;">${p.name}</h3>
                            <div class="tier-price-row">
                                <span class="tier-price">${p.price}</span>
                                <span style="font-size:0.78rem; color:var(--text-tertiary);">${p.period}</span>
                            </div>
                            <ul class="tier-features-list">
                                ${p.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('')}
                            </ul>
                            ${p.tier === 'free'
                                ? `<button class="btn-hero-outline" style="margin-top:auto;" onclick="switchClassTab('${classKey}', 'units', document.getElementById('tab-${classKey === 'class-11' ? 'c11' : 'c12'}-units'))">${p.cta}</button>`
                                : `<a href="https://wa.me/9779841000000?text=Namaste%20BPG%20Sir,%20I%20want%20to%20enroll%20in%20${encodeURIComponent(p.name)}" target="_blank" class="btn-hero-action" style="margin-top:auto;"><i class="fa-brands fa-whatsapp"></i> ${p.cta}</a>`
                            }
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // 4. Render Notes & PDFs Vault
        const notesContainer = document.getElementById(`notesContainer-${classKey}`);
        if (notesContainer) {
            notesContainer.innerHTML = `
                <div class="notes-vault-grid">
                    ${data.notes.map(n => `
                        <div class="note-pdf-card">
                            <div class="note-pdf-left">
                                <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                                <div>
                                    <span class="note-badge-pill ${n.badgeClass}">${n.type}</span>
                                    <h4 style="font-size:1rem; margin-bottom:2px;">${n.title}</h4>
                                    <small style="color:var(--text-tertiary);">${n.unit} &bull; ${n.pages} &bull; Verified by BPG Sir</small>
                                </div>
                            </div>
                            <button class="btn-hero-outline" style="padding:8px 14px; font-size:0.82rem; flex-shrink:0;" onclick="handleNoteAction('${n.title.replace(/'/g, "\\'")}', '${n.badgeClass}', '${classKey}')">
                                <i class="fa-solid ${n.badgeClass === 'free' ? 'fa-download' : 'fa-crown'}"></i>
                                ${n.badgeClass === 'free' ? 'Open PDF' : 'Unlock'}
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    });
}

function renderUnitsTree(classKey, filterQuery) {
    const sidebar = document.getElementById(`readerSidebar-${classKey}`);
    if (!sidebar) return;

    const q = (filterQuery || '').trim().toLowerCase();
    const units = PORTAL_DATA[classKey].units;

    sidebar.innerHTML = units.map((u, idx) => {
        const matchedTopics = u.topics.filter(t =>
            !q ||
            t.title.toLowerCase().includes(q) ||
            u.title.toLowerCase().includes(q) ||
            t.overview.toLowerCase().includes(q)
        );
        if (q && matchedTopics.length === 0) return '';

        return `
            <div class="unit-tree-group ${idx === 0 || q ? 'open' : ''}">
                <button class="unit-tree-header" onclick="this.parentElement.classList.toggle('open')">
                    <div>
                        <span class="unit-tree-code">${u.code}</span>
                        <span>${u.title}</span>
                    </div>
                    <i class="fa-solid fa-chevron-down" style="font-size:0.72rem; color:var(--text-tertiary);"></i>
                </button>
                <div class="unit-subtopics-list">
                    ${matchedTopics.map(t => `
                        <button class="subtopic-item-btn" id="btn-${t.id}" onclick="selectDeepSubtopic('${classKey}', '${u.code}', '${u.title.replace(/'/g, "\\'")}', '${t.id}')">
                            <span class="subtopic-item-title">${t.title}</span>
                            <div class="subtopic-item-meta">
                                <span><i class="fa-regular fa-clock"></i> ${t.readTime}</span>
                                <span style="color:var(--accent-amber); font-weight:700;">${t.badge}</span>
                            </div>
                        </button>
                    `).join('')}
                    <div class="subtopic-admin-slot">
                        <i class="fa-solid fa-plus-circle" style="color:var(--accent-navy);"></i>
                        <span>Super Admin Slot: Ready for additional subtopics</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterUnitsTree(classKey, query) {
    renderUnitsTree(classKey, query);
}

function selectDeepSubtopic(classKey, unitCode, unitTitle, topicId) {
    const data = PORTAL_DATA[classKey];
    let foundTopic = null;
    data.units.forEach(u => {
        u.topics.forEach(t => {
            if (t.id === topicId) foundTopic = t;
        });
    });
    if (!foundTopic) return;

    const sidebar = document.getElementById(`readerSidebar-${classKey}`);
    sidebar?.querySelectorAll('.subtopic-item-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${topicId}`)?.classList.add('active');

    const canvas = document.getElementById(`readerCanvas-${classKey}`);
    if (!canvas) return;

    canvas.innerHTML = `
        <div class="reader-article-meta">
            <div>
                <span class="pathway-badge">${unitCode} &bull; ${unitTitle}</span>
                <span class="pathway-badge amber" style="margin-left:6px;">${foundTopic.badge}</span>
            </div>
            <span style="font-size:0.82rem; color:var(--text-tertiary);">
                <i class="fa-regular fa-clock"></i> ${foundTopic.readTime} &bull; Authored by BPG Sir
            </span>
        </div>

        <h2 class="reader-article-title">${foundTopic.title}</h2>

        <div class="reader-section-block">
            <h3><i class="fa-solid fa-lightbulb"></i> 1. Conceptual Overview & Mathematical Intuition</h3>
            <p>${foundTopic.overview}</p>
        </div>

        <div class="reader-section-block">
            <h3><i class="fa-solid fa-square-root-variable"></i> 2. Formal Definitions & Master Formulas</h3>
            <div class="math-theorem-box">
                ${foundTopic.definitions}
            </div>
        </div>

        <div class="reader-section-block">
            <h3><i class="fa-solid fa-pen-Nib"></i> 3. Step-by-Step Board Derivation & Analytical Proof</h3>
            <p>${foundTopic.derivation}</p>
        </div>

        <div class="reader-section-block">
            <h3><i class="fa-solid fa-chalkboard-user"></i> 4. Standard NEB Worked Example</h3>
            <div class="worked-example-card">
                <p style="margin:0; white-space:pre-line;">${foundTopic.example}</p>
            </div>
        </div>

        <div class="red-pen-alert">
            <h4><i class="fa-solid fa-triangle-exclamation"></i> 5. BPG Sir’s Red-Pen Common Mistake & Exam Alert</h4>
            <p style="margin:0; font-size:0.9rem; color:var(--text-primary);">${foundTopic.pitfalls}</p>
        </div>

        <div class="super-admin-cms-placeholder">
            <div>
                <strong><i class="fa-solid fa-cloud-arrow-up" style="color:var(--accent-navy);"></i> Super Admin Content Extension Slot</strong>
                <div style="font-size:0.78rem; color:var(--text-tertiary);">Reserved for extended 1,000+ word markdown notes, interactive graphs, and board practice sets.</div>
            </div>
            <span class="pathway-badge">CMS Slot ID: ${foundTopic.id}</span>
        </div>
    `;

    if (window.renderMathInElement) {
        renderMathInElement(canvas, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ]
        });
    }
}

function handleNoteAction(title, badgeClass, classKey) {
    if (badgeClass === 'free') {
        showToast(`Opening Free Sample PDF: "${title}"`);
    } else {
        showToast('Diamond / Gold Exclusive Resource — Switching to Premium Plans');
        const tabBtnId = classKey === 'class-11' ? 'tab-c11-plans' : 'tab-c12-plans';
        switchClassTab(classKey, 'plans', document.getElementById(tabBtnId));
    }
}

/* --------------------------------------------------------------------------
   3. HEADER NOTIFICATION DRAWER & UTILITIES
   -------------------------------------------------------------------------- */
function toggleNotifDrawer(e) {
    e.stopPropagation();
    document.getElementById('notifDrawer')?.classList.toggle('open');
}

function markAllNotificationsRead() {
    document.querySelectorAll('.notif-item.unread').forEach(item => item.classList.remove('unread'));
    const badge = document.getElementById('notifUnreadBadge');
    if (badge) badge.style.display = 'none';
    showToast('All academic notices marked as read');
}

function copyText(text, msg) {
    navigator.clipboard?.writeText(text);
    showToast(msg || 'Copied to clipboard!');
}

function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

/* --------------------------------------------------------------------------
   4. SCIENTIFIC CALCULATOR & DRAGGABLE WIDGET
   -------------------------------------------------------------------------- */
let calcExpr = '';
let calcAns = 0;
let calcAngleMode = 'DEG';

function updateCalcDisplay(valText) {
    document.getElementById('calcExprDisplay').textContent = calcExpr || 'Ready';
    document.getElementById('calcValDisplay').textContent = valText !== undefined ? valText : (calcExpr || '0');
}

function toggleCalcAngle() {
    calcAngleMode = calcAngleMode === 'DEG' ? 'RAD' : 'DEG';
    document.getElementById('calcAngleBtn').textContent = calcAngleMode;
    showToast(`Calculator set to ${calcAngleMode} mode`);
}

function appendCalc(ch) {
    calcExpr += ch;
    updateCalcDisplay();
}

function appendScientific(fn) {
    const map = {
        sin: 'sin(',
        cos: 'cos(',
        tan: 'tan(',
        log: 'log(',
        ln: 'ln(',
        sqrt: '√(',
        sq: '^2',
        pow: '^',
        pi: 'π',
        e: 'e',
        ans: String(calcAns)
    };
    calcExpr += map[fn] || '';
    updateCalcDisplay();
}

function clearCalc() {
    calcExpr = '';
    updateCalcDisplay('0');
}

function backspaceCalc() {
    calcExpr = calcExpr.slice(0, -1);
    updateCalcDisplay();
}

function evaluateCalc() {
    if (!calcExpr) return;
    try {
        const toRad = calcAngleMode === 'DEG' ? `(Math.PI/180)*` : '';
        let parsed = calcExpr
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, 'Math.PI')
            .replace(/\be\b/g, 'Math.E')
            .replace(/√\(/g, 'Math.sqrt(')
            .replace(/sin\(/g, `Math.sin(${toRad}`)
            .replace(/cos\(/g, `Math.cos(${toRad}`)
            .replace(/tan\(/g, `Math.tan(${toRad}`)
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/\^/g, '**');

        const res = Function(`"use strict"; return (${parsed})`)();
        calcAns = Number(res.toFixed(8));
        updateCalcDisplay(String(calcAns));
    } catch (e) {
        updateCalcDisplay('Syntax Error');
    }
}

function initDraggableCalculator() {
    const widget = document.getElementById('draggableCalcWidget');
    const handle = document.getElementById('calcDragHandle');
    const triggerBtn = document.getElementById('floatingCalcTriggerBtn');
    const closeBtn = document.getElementById('calcWidgetCloseBtn');

    triggerBtn?.addEventListener('click', () => widget.classList.toggle('open'));
    closeBtn?.addEventListener('click', () => widget.classList.remove('open'));

    let isDragging = false, startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

    const startDrag = (clientX, clientY) => {
        isDragging = true;
        const rect = widget.getBoundingClientRect();
        widget.style.left = `${rect.left}px`;
        widget.style.top = `${rect.top}px`;
        widget.style.right = 'auto';
        widget.style.bottom = 'auto';
        startX = clientX;
        startY = clientY;
        initialLeft = rect.left;
        initialTop = rect.top;
    };

    const moveDrag = (clientX, clientY) => {
        if (!isDragging) return;
        const maxLeft = window.innerWidth - widget.offsetWidth - 8;
        const maxTop = window.innerHeight - widget.offsetHeight - 8;
        const nextLeft = Math.min(Math.max(8, initialLeft + (clientX - startX)), maxLeft);
        const nextTop = Math.min(Math.max(8, initialTop + (clientY - startY)), maxTop);
        widget.style.left = `${nextLeft}px`;
        widget.style.top = `${nextTop}px`;
    };

    handle?.addEventListener('mousedown', e => {
        if (e.target.closest('button')) return;
        startDrag(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
    window.addEventListener('mouseup', () => { isDragging = false; });

    handle?.addEventListener('touchstart', e => {
        if (e.target.closest('button')) return;
        const t = e.touches[0];
        startDrag(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const t = e.touches[0];
        moveDrag(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
}

/* --------------------------------------------------------------------------
   5. AUTHENTICATION & STUDENT ONBOARDING
   -------------------------------------------------------------------------- */
function openAuthModal() {
    document.getElementById('authModal').classList.add('open');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('open');
}

function switchAuthTab(tab) {
    document.getElementById('tabBtn-google').classList.toggle('active', tab !== 'login');
    document.getElementById('tabBtn-login').classList.toggle('active', tab === 'login');
    document.querySelectorAll('.auth-step-pane').forEach(p => p.classList.remove('active'));
    document.getElementById(`tabPane-${tab}`)?.classList.add('active');
}

function startGoogleOnboarding() {
    document.getElementById('setupEmail').value = 'student.motherland@gmail.com';
    document.querySelectorAll('.auth-step-pane').forEach(p => p.classList.remove('active'));
    document.getElementById('tabPane-setup').classList.add('active');
}

function handleCompleteRegistration(e) {
    e.preventDefault();
    const name = document.getElementById('setupName').value.trim();
    const username = document.getElementById('setupUsername').value.trim();
    const grade = document.getElementById('setupGrade').value;

    if (!username.includes('@') || !/\d/.test(username)) {
        const hint = document.getElementById('usernameHint');
        hint.style.color = 'var(--accent-crimson)';
        showToast('Username must contain @ and at least one number');
        return;
    }

    setLoggedInUser(name, grade);
    closeAuthModal();
    showToast(`Welcome to BPG Academy, ${name}! All class portals unlocked.`);

    if (pendingTargetView) {
        const next = pendingTargetView;
        pendingTargetView = null;
        navigateTo(next);
    }
}

function handleReturningLogin(e) {
    e.preventDefault();
    const user = document.getElementById('loginUsername').value.trim();
    setLoggedInUser(user.replace(/^@/, '') || 'Student', 'Class 12');
    closeAuthModal();
    showToast('Signed in! Class portals unlocked.');

    if (pendingTargetView) {
        const next = pendingTargetView;
        pendingTargetView = null;
        navigateTo(next);
    }
}

function setLoggedInUser(name, role) {
    isAuthenticated = true;
    document.body.classList.add('user-authenticated');
    document.getElementById('headerGoogleBtn').style.display = 'none';
    const pill = document.getElementById('headerUserPill');
    pill.classList.add('visible');
    document.getElementById('headerUserName').textContent = name;
    document.getElementById('headerUserRole').textContent = role;
    document.getElementById('headerUserAvatar').textContent = name.charAt(0).toUpperCase();
}

function handleSignOut() {
    isAuthenticated = false;
    document.body.classList.remove('user-authenticated');
    document.getElementById('headerUserPill').classList.remove('visible');
    document.getElementById('headerGoogleBtn').style.display = 'inline-flex';
    navigateTo('about');
    showToast('Signed out of BPG Academy');
}

/* Global Click-Outside Handler for Dropdowns */
document.addEventListener('click', e => {
    if (!e.target.closest('#notifWrapper')) {
        document.getElementById('notifDrawer')?.classList.remove('open');
    }
    if (!e.target.closest('.dropdown-wrapper')) {
        document.getElementById('classesDropdownMenu')?.classList.remove('open');
    }
});

/* Initialize on DOM Load */
document.addEventListener('DOMContentLoaded', () => {
    renderAllPortals();
    initDraggableCalculator();
});
