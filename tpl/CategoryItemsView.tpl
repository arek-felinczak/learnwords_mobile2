<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading"><strong>Categories</strong></div>
    <div class="panel-body">
        <p> Words are grouped into categories. Please select one to load list of words. </p>
    </div>
    <ul class="list-group" id='CategoryList'>
        {{#each categories}}
        <li href="#category/{{Id}}" class="navigate list-group-item">
            {{Name}} 
        </li>
        {{/each}}
    </ul>
</div>        