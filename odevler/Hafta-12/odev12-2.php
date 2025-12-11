<?php
$rows = null;
$cols = null;


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $rows = isset($_POST["rows"]) ? (int) $_POST["rows"] : 0;
    $cols = isset($_POST["cols"]) ? (int) $_POST["cols"] : 0;

    
    if ($rows <= 0 || $cols <= 0) {
        $error = "Lütfen satır ve sütun için pozitif bir sayı giriniz.";
    }
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Rastgele Sayılarla Tablo</title>
    <style>
        table {
            border-collapse: collapse;
            margin-top: 20px;
        }
        td, th {
            border: 1px solid #000;
            padding: 8px 12px;
            text-align: center;
        }
    </style>
</head>
<body>

    <h1>Rastgele Sayılarla Tablo Oluşturma</h1>

    <form method="post" action="">
        <label>Satır sayısı:
            <input type="number" name="rows" min="1" required>
        </label>
        <br><br>
        <label>Sütun sayısı:
            <input type="number" name="cols" min="1" required>
        </label>
        <br><br>
        <button type="submit">Tabloyu Oluştur</button>
    </form>

    <?php if (isset($error)): ?>
        <p style="color:red;"><?php echo $error; ?></p>
    <?php endif; ?>

    <?php
    if ($rows > 0 && $cols > 0 && !isset($error)) {
        echo "<h2>{$rows} x {$cols} Boyutunda Tablo</h2>";
        echo "<table>";

        for ($i = 0; $i < $rows; $i++) {
            echo "<tr>";
            for ($j = 0; $j < $cols; $j++) {
                $randNumber = rand(1, 100);
                echo "<td>$randNumber</td>";
            }
            echo "</tr>";
        }

        echo "</table>";
    }
    ?>

</body>
</html>
