<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading"><h4>Categories</h4></div>
    <div class="panel-body">
        <p> Words are grouped into categories. Please select one to load list of words. </p>
    </div>
    <ul class="list-group" id='CategoryList'>
        {{#each categories}}
            <a href="#category/{{Id}}"> 
                <li class="list-group-item">
                    {{Name}}
                </li>
            </a>
        {{/each}}
    </ul>
</div>        