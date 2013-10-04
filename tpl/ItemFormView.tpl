<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading">{{{breadcrumb}}}</div>
    <div class="panel-body" style='padding:8px'>
        <form role="form" class="form-horizontal margin-medium">
            <fieldset>
                <div class="form-group">
                    <input type="hidden" id="Id" name="Id" value="{{model.Id}}"/>
                    <label for="Word" class="col-lg-2 control-label">Word:</label>
                    <div class="col-lg-10">
                        <input type="text" id="Word" name="Word" class="form-control" value="{{model.Word}}"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="Translation1" class="col-lg-2 control-label">Translation:</label>
                    <div class="col-lg-10">
                        <input type="text" id="Translation1" name="Translation1" class="form-control" value="{{model.Translation1}}"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="Translation2" class="col-lg-2 control-label">Translation:</label>
                    <div class="col-lg-10">
                        <input type="text" id="Translation2" name="Translation2" class="form-control" value="{{model.Translation2}}"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="CategoryId" class="col-lg-2 control-label">Category:</label>
                    <div class="col-lg-10">
                        <select id="CategoryId" class="form-control" name="CategoryId">
                            <option value="0">Choose category</option>
                            {{#each categories}}
                            <option cat-id="{{Id}}" value="{{Id}}">{{Name}}</option>
                            {{/each}}
                        </select>
                    </div>
                </div>
            </fieldset>
        <div class="form-group">
        <div class="col-lg-offset-2 col-lg-10">
        <a href="#" class="btn btn-default save"> Save </a>
        </div>
        </div>                         
        </form>
    </div>
</div>