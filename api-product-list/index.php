<?php

header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

class DB
{
    public $pdo;

    public function __construct()
    {
        $this->pdo = self::make();
    }

    public static function make()
    {
        $config = [
                'database' => 'product',
                'username' => 'root',
                'password' => '',
                'connection' => 'mysql:host=127.0.0.1',
                'charset' => 'utf8',
        ];

        return new PDO("{$config['connection']};dbname={$config['database']};charset={$config['charset']};", "{$config['username']}", "{$config['password']}");
    }

    public function getAll($table) {
        $pdo = $this->pdo;
        $statement = $pdo->prepare("SELECT * FROM {$table}");
        $statement->execute();
        $posts = $statement->fetchAll(PDO::FETCH_ASSOC);
    
        return $posts;
    }

    public function create($table, $data) 
    {
        $keys = implode(', ', array_keys($data));
        $value = ':' . implode(', :', array_keys($data));

        $query = "INSERT INTO {$table} ({$keys}) VALUES ({$value})";

        $statement = $this->pdo->prepare($query);
        $statement->execute($data);
    }

    public function delete($table, $id)
    {
        $sql = "DELETE FROM {$table} WHERE id=:id";

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':id', $id);
        $statement->execute();
    }

}

$db = new DB();

$parse = parse_url(((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);

if ($parse['path'] == '/product') {
    $res = $db->getAll('basket');
    echo json_encode($res);

    exit();
}

if ($parse['path'] == '/create' && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $res = $db->create('basket', $decoded);

    exit();
}

if ($parse['path'] == '/delete' && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $res = $db->delete('basket', $decoded['id']);

    exit();
}

echo json_encode(null);

?>