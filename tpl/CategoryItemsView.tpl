<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading">{{{breadcrumb}}}</div>
    <div class="panel-body hidden" id="helpDiv">
        <p>
            Words are grouped into categories. Please select one to load list of words. 
        </p>
    </div>
    <ul class="list-group" id='CategoryList'>
        {{#each categories}}        
        <li onclick="return go('#category/{{Id}}/1');" class="link list-group-item">
            {{Name}} 
        </li>               
        {{/each}}
    </ul>
</div>        