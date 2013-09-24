<?php

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && (
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST' ||
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'DELETE' ||
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'PUT' )) {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Credentials: true");
        header('Access-Control-Allow-Headers: X-Requested-With');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT'); // http://stackoverflow.com/a/7605119/578667
        header('Access-Control-Max-Age: 86400');
    }
    exit;
}

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: origin, x-requested-with, content-type');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');    

include_once 'Slim/Slim.php';

$app = new Slim();

$app->get('/categories', 'getCategories');
$app->post('/items/search', 'findByName');
$app->get('/categories/:id', 'getCategory');
$app->get('/items/:id', 'getCategoryItems');
$app->get('/item/:id', 'getItem');
$app->post('/item', 'addWord');
//$app->delete('/wines/:id', 'deleteWine');
//$app->put('/wines/:id', 'updateWine'); 

$app->run();


function getCategories() {
    $sql = "select * FROM Category ORDER BY name";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $cats = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($cats);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function getCategory($id) {
    $sql = "SELECT * FROM Category WHERE Public=1 AND id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $cat = $stmt->fetchObject();
        echo json_encode($cat);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getCategoryItems($id) {
    $sql = "SELECT * FROM Item WHERE Approved=1 AND CategoryId=:id ORDER BY id DESC";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $items = $stmt->fetchAll();
        
        echo json_encode($items);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getItem($id) {
    $sql = "SELECT * FROM Item WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $items = $stmt->fetch();
        
        echo json_encode($items);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addWord() {
    $request = Slim::getInstance()->request();
    $item = json_decode($request->getBody());
    $sql = "INSERT INTO Item (Id, CategoryId, Word, Translation1, Translation2) VALUES (:Id, :CategoryId, :Word, :Translation1, :Translation2)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("Id", $item->Id);
        $stmt->bindParam("Word", $item->Word);
        $stmt->bindParam("Translation1", $item->Translation1);
        $stmt->bindParam("Translation2", $item->Translation2);
        $stmt->bindParam("CategoryId", $item->CategoryId);
        $stmt->execute();
        $item->Id = $db->lastInsertId();
        $db = null;
        echo json_encode($item);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
/* 
function updateWine($id) {
    $request = Slim::getInstance()->request();
    $body = $request->getBody();
    $wine = json_decode($body);
    $sql = "UPDATE wine SET name=:name, grapes=:grapes, country=:country, region=:region, year=:year, description=:description WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $wine->name);
        $stmt->bindParam("grapes", $wine->grapes);
        $stmt->bindParam("country", $wine->country);
        $stmt->bindParam("region", $wine->region);
        $stmt->bindParam("year", $wine->year);
        $stmt->bindParam("description", $wine->description);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($wine);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function deleteWine($id) {
    $sql = "DELETE FROM wine WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
*/

function findByName() {
    $query = trim($_POST['query']);
    $sqlExactWord = "SELECT * From Item where Word = :query Or Translation1 = :query OR  Translation2 = :query ORDER BY Word LIMIT 0 , 20";
    $sqlShortPharse = "SELECT * From Item where Word Like :query Or Translation1 Like :query OR  Translation2 Like :query ORDER BY Word LIMIT 0 , 20";
    $sqlFullText = "SELECT * ,MATCH (Word, Translation1, Translation2) AGAINST (:query) AS relevancy FROM Item  WHERE (MATCH (Word, Translation1, Translation2) AGAINST (:query IN BOOLEAN MODE) > 0) ORDER BY relevancy DESC LIMIT 0 , 20";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sqlExactWord);
        $stmt->bindParam("query", $query);
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_OBJ);
        if (count($items) > 0) {
            echo json_encode($items);
            return;            
        }
        if (strlen($query) > 3)
            $stmt = $db->prepare($sqlFullText);
        else {
            $query = $query . "%";
            $stmt = $db->prepare($sqlShortPharse);
        }
        $stmt->bindParam("query", $query);
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($items);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function getConnection() {
    $dbhost="mysql.cba.pl:3306";
    $dbuser="afelin";
    $dbpass="LEArnwords01";
    $dbname="vocabulary_cba_pl";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->exec("set names utf8");
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}
?>